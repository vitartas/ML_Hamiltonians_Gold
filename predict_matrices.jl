using ACEhamiltonians
using ACEfit: BLR
using HDF5
using Serialization

# Feel free to change the committee size, but due to the naive implementation
# the computational scaling is linear with respect to the committee size.
# Therefore, I would not recommend using larger committees unless you are prepared
# to wait for a very long time.
committee_size = 10

# It is assumed that the script is run from the `ML_Hamiltonians_Gold` directory,
# in which case the script should work. If the script is being run from
# a different directory, change the `ML_Hamiltonians_Gold_path` with an appropriate
# relative or absolute path.
ML_Hamiltonians_Gold_path = "."

# Deserialise the saved models
@info "Loading the models"
flush(stdout)
model_H = deserialize("$(ML_Hamiltonians_Gold_path)/models/Au_fcc_barbar_H_committee.bin")
model_S = deserialize("$(ML_Hamiltonians_Gold_path)/models/Au_fcc_barbar_S_committee.bin")

# Path to the database containing the target system
predicting_path = "$(ML_Hamiltonians_Gold_path)/systems/Au_hcp.h5"
predicting_systems = ["run_Aims_fevy_a5b"]

# Load the predicting database
predicting_database = h5open(predicting_path)

# Predict matrices and write to a new database
h5open("$(ML_Hamiltonians_Gold_path)/Au_hcp_committee.h5", "w") do db

    for predicting_system in predicting_systems
        atoms = load_atoms(predicting_database[predicting_system]; recentre=true)
        images_pred = cell_translations(atoms, model_H)

        create_group(db, predicting_system)
        db[predicting_system]["images_pred"] = images_pred

        # Predict the real-space Hamiltonian and overlap matrices (mean)
        create_group(db[predicting_system], "mean_prediction")
        db_mu_pred = db["$(predicting_system)/mean_prediction"]

        H_real_pred = predict(model_H, atoms, images_pred)
        S_real_pred = predict(model_S, atoms, images_pred)
        db_mu_pred["H"] = H_real_pred
        db_mu_pred["S"] = S_real_pred

        # Predict the real-space Hamiltonian and overlap matrices (committee)
        create_group(db[predicting_system], "committee_prediction")
        db_committee_pred = db["$(predicting_system)/committee_prediction"]

        model_H_copy = deepcopy(model_H)
        model_S_copy = deepcopy(model_S)

        for i = 1:committee_size
            @info "Predicting H and S for a member $i"
	    flush(stdout)

            create_group(db_committee_pred, "$i")
            db_committee_pred_i = db["$(predicting_system)/committee_prediction/$(i)"]

            # Update coefficients of on-site models
            for submodel in values(model_H_copy.on_site_submodels)
                submodel.coefficients .= submodel.fit_results["committee"][:, i]
            end
            for submodel in values(model_S_copy.on_site_submodels)
                submodel.coefficients .= submodel.fit_results["committee"][:, i]
            end

            # Update coefficients of off-site models
            for submodel in values(model_H_copy.off_site_submodels)
                submodel.coefficients .= submodel.fit_results["committee"][:, i]
                if typeof(submodel) <: AnisoSubModel
                    submodel.coefficients_i .= submodel.fit_results_i["committee"][:, i]
                end
            end
            for submodel in values(model_S_copy.off_site_submodels)
                submodel.coefficients .= submodel.fit_results["committee"][:, i]
                if typeof(submodel) <: AnisoSubModel
                    submodel.coefficients_i .= submodel.fit_results_i["committee"][:, i]
                end
            end

            H_real_pred = predict(model_H_copy, atoms, images_pred)
            S_real_pred = predict(model_S_copy, atoms, images_pred)
            db_committee_pred_i["H"] = H_real_pred
            db_committee_pred_i["S"] = S_real_pred

        end

    end

end
