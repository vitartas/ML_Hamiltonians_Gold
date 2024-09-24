import os
import h5py
import numpy as np
import hamutils as ham
import matplotlib.pyplot as plt
from ase.atoms import Atoms

if __name__ == "__main__":

    ##############
    # Parameters #
    ##############

    # As in the inference stage, change this variable to the directory path of the cloned
    # `ML_Hamiltonians_Gold` repository if you are running the script outside the repository.
    ML_Hamiltonians_Gold_path = "."

    # DOS parameters
    energy_range = (-10, 10)
    n_points = 1000
    kpoint_density_dos = 10.0
    broadening = 0.1

    #############
    # Load Data #
    #############

    config_name = "run_Aims_fevy_a5b"
    with h5py.File(os.path.join(ML_Hamiltonians_Gold_path, "systems", "Au_hcp.h5"), "r") as db:
        atomic_numbers = db[f"{config_name}/Structure/atomic_numbers"][()]
        lattice = db[f"{config_name}/Structure/lattice"][()]
        positions = db[f"{config_name}/Structure/positions"][()]
        pbc = db[f"{config_name}/Structure/pbc"][()]

        basis_full = db[f"/{config_name}/Info/Basis/79"][()]
        Nb_at = np.sum([2*l + 1 for n, l in basis_full])
        Nbv_at = 12

        H_true = db[f"/{config_name}/Data/H"][()]
        S_true = db[f"/{config_name}/Data/S"][()]
        fermi_level = db[f"/{config_name}/Data/fermi_level"][()]
        images_true = db[f"/{config_name}/Info/Translations"][()]

    pred_committee = {"H": [], "S": []}
    with h5py.File(os.path.join(ML_Hamiltonians_Gold_path, "Au_hcp_committee.h5"), "r") as db:
        Hvv_pred = db[f"/{config_name}/mean_prediction/H"][()]
        Svv_pred = db[f"/{config_name}/mean_prediction/S"][()]
        images_pred = db[f"/{config_name}/images_pred"][()]

        committee_size = len(list(db[f"{config_name}/committee_prediction"].keys()))
        for i in range(committee_size):
            idx = i + 1

            H_pred_committee_i = db[f"{config_name}/committee_prediction/{idx}/H"][()]
            S_pred_committee_i = db[f"{config_name}/committee_prediction/{idx}/S"][()]
            pred_committee["H"].append(H_pred_committee_i)
            pred_committee["S"].append(S_pred_committee_i)

    atoms = Atoms(atomic_numbers, positions=positions, cell=lattice, pbc=pbc)
    cell = atoms.cell
    Nat = len(atoms)

    ###############
    # Compute DOS #
    ###############

    _direc = os.path.join(ML_Hamiltonians_Gold_path, "dos", "dos_true")
    ham.write_dos(
        cell, energy_range, n_points, fermi_level, H_true, S_true, images_true,
        kpoint_density_dos, _direc, broadening
    )

    _direc = os.path.join(ML_Hamiltonians_Gold_path, "dos", "dos_pred")
    ham.write_dos(
        cell, energy_range, n_points, fermi_level, Hvv_pred, Svv_pred, images_pred,
        kpoint_density_dos, _direc, broadening
    )

    for i in range(committee_size):
        _direc = os.path.join(ML_Hamiltonians_Gold_path, "dos", "dos_committee", f"dos_pred_{i}")
        ham.write_dos(
            cell, energy_range, n_points, fermi_level, pred_committee["H"][i], pred_committee["S"][i], images_pred,
            kpoint_density_dos, _direc, broadening
        )

    dos_values_committee = []
    for i in range(committee_size):
        dos_energies, dos_values = np.loadtxt(os.path.join(ML_Hamiltonians_Gold_path, "dos", "dos_committee", f"dos_pred_{i}", "cdos.dat")).T
        dos_values_committee.append(dos_values)

    dos_values_committee = np.stack(dos_values_committee)
    dos_values_committee_std = np.std(dos_values_committee, axis=0, ddof=1)

    ############
    # Plot DOS #
    ############

    fig, ax = plt.subplots(figsize=(8, 5))
    colors = ham.qualitative_color
    uncertainty_color = colors[1]
    uncertainty_alpha = 0.5

    dos_energies_true, dos_values_true = np.loadtxt(os.path.join(ML_Hamiltonians_Gold_path, "dos", "dos_true", "cdos.dat")).T
    dos_energies_pred, dos_values_pred = np.loadtxt(os.path.join(ML_Hamiltonians_Gold_path, "dos", "dos_pred", "cdos.dat")).T

    ax.plot(dos_values_true, dos_energies_true, label="True", color=colors[0], linewidth=1.5)
    ax.plot(dos_values_pred, dos_energies_pred, label="Predicted", color=colors[1], linewidth=1.5)
    ax.fill_betweenx(dos_energies,
                    dos_values_pred - 2*dos_values_committee_std,
                    dos_values_pred + 2*dos_values_committee_std,
                    label="Committee Uncertainty", color=uncertainty_color, alpha=uncertainty_alpha)

    ax.set_xlabel("$n(E)$ / eV$^{-1}$", fontsize=14)
    ax.set_ylabel("$E - \epsilon_{F}$ / eV", fontsize=14)

    ax.tick_params(axis="both", which="both", labelsize=14)

    ax.legend(loc="upper right", fontsize=14)

    fig.tight_layout()
    fig.savefig(os.path.join(ML_Hamiltonians_Gold_path, "Au_hcp_DOS.png"))
