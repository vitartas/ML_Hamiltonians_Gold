var documenterSearchIndex = {"docs":
[{"location":"installation/","page":"Installation","title":"Installation","text":"Pages = [\"installation.md\"]\nDepth = 3","category":"page"},{"location":"installation/#Installation","page":"Installation","title":"Installation","text":"","category":"section"},{"location":"installation/","page":"Installation","title":"Installation","text":"This section describes how to install software and packages that are required in order to reproduce the Au(HCP) electronic density of states (DOS) as shown in the Tutorial.","category":"page"},{"location":"installation/","page":"Installation","title":"Installation","text":"It is assumed that both the installation and the tutorial will be run on University of Warwick SCRTP systems, such as hetmathsys nodes.","category":"page"},{"location":"installation/#Julia","page":"Installation","title":"Julia","text":"","category":"section"},{"location":"installation/","page":"Installation","title":"Installation","text":"On SCRTP systems Julia 1.10.4 can be loaded using the module system as follows:","category":"page"},{"location":"installation/","page":"Installation","title":"Installation","text":"module purge\nmodule load Julia/1.10.4-linux-x86_64","category":"page"},{"location":"installation/#ACEhamiltonians","page":"Installation","title":"ACEhamiltonians","text":"","category":"section"},{"location":"installation/","page":"Installation","title":"Installation","text":"ACEhamiltonians is a Julia package which is used to perform training and inference of real-space Hamiltonians and overlap matrices.[1]","category":"page"},{"location":"installation/#Download","page":"Installation","title":"Download","text":"","category":"section"},{"location":"installation/","page":"Installation","title":"Installation","text":"First, ACEhamiltonians can be obtained by cloning the repository from GitHub:","category":"page"},{"location":"installation/","page":"Installation","title":"Installation","text":"git clone git@github.com:vitartas/ACEhamiltonians.jl.git","category":"page"},{"location":"installation/","page":"Installation","title":"Installation","text":"warning: Warning\nThe snippet above might not work if you have not set up an SSH key on GitHub. In that case the code must be replaced with git clone https://github.com/ACEsuit/ACEhamiltonians.jl.git.","category":"page"},{"location":"installation/","page":"Installation","title":"Installation","text":"Once the repository has been cloned, cd into the directory and switch to the committee branch as follows:","category":"page"},{"location":"installation/","page":"Installation","title":"Installation","text":"cd ACEhamiltonians.jl\ngit switch committee","category":"page"},{"location":"installation/#Install","page":"Installation","title":"Install","text":"","category":"section"},{"location":"installation/","page":"Installation","title":"Installation","text":"The code together with its dependencies can be installed as shown below.","category":"page"},{"location":"installation/","page":"Installation","title":"Installation","text":"First, activate the ACEhamiltonians.jl Julia environment (while in ACEhamiltonians.jl directory):","category":"page"},{"location":"installation/","page":"Installation","title":"Installation","text":"julia --project=.","category":"page"},{"location":"installation/","page":"Installation","title":"Installation","text":"warning: Warning\nIt was found that running this script inside a VSCode terminal can sometimes lead to unsuccessful installation of packages. Therefore, it is advised to run Julia inside a separate linux terminal.","category":"page"},{"location":"installation/","page":"Installation","title":"Installation","text":"Run the following code inside Julia to install ACEhamiltonians with its dependencies:","category":"page"},{"location":"installation/","page":"Installation","title":"Installation","text":"using Pkg\n\n# Add MolSim registry\nPkg.Registry.add(RegistrySpec(url=\"https://github.com/JuliaMolSim/MolSim.git\"))\n# Add newer ACE registry\nPkg.Registry.add(RegistrySpec(url=\"https://github.com/ACEsuit/ACEregistry.git\"))\n# Readd General registry for stability\nPkg.Registry.add(\"General\")\n\n# Instantiate the environment from the `Project.toml` file\nPkg.instantiate()","category":"page"},{"location":"installation/","page":"Installation","title":"Installation","text":"After the installation, the Julia session can be exited. To ensure ACEhamiltonians was installed successfully, a new Julia session can be started as before, and using ACEhamiltonians can be run inside Julia, which should return no errors if the installation was successful.","category":"page"},{"location":"installation/#Hamutils","page":"Installation","title":"Hamutils","text":"","category":"section"},{"location":"installation/","page":"Installation","title":"Installation","text":"In order to post-process the results of the Hamiltonian prediction, an additional Python package hamutils was written. It is advised to create a separate Python environment (e.g. virtual or conda) when installing this package.","category":"page"},{"location":"installation/#Python-Venv","page":"Installation","title":"Python Venv","text":"","category":"section"},{"location":"installation/","page":"Installation","title":"Installation","text":"How to create and activate a Python environment on SCRTP systems is shown below.","category":"page"},{"location":"installation/","page":"Installation","title":"Installation","text":"Load an appropriate Python version from the module system:","category":"page"},{"location":"installation/","page":"Installation","title":"Installation","text":"module load GCCcore/12.3.0 Python/3.11.3","category":"page"},{"location":"installation/","page":"Installation","title":"Installation","text":"Create and activate a virtual environment:","category":"page"},{"location":"installation/","page":"Installation","title":"Installation","text":"python -m venv ham_venv\nsource ham_venv/bin/activate","category":"page"},{"location":"installation/#Download-and-Install","page":"Installation","title":"Download & Install","text":"","category":"section"},{"location":"installation/","page":"Installation","title":"Installation","text":"Once the environment is activated, the hamutils package can be installed as follows:","category":"page"},{"location":"installation/","page":"Installation","title":"Installation","text":"Clone hamutils from GitHub:","category":"page"},{"location":"installation/","page":"Installation","title":"Installation","text":"git clone git@github.com:vitartas/hamutils.git","category":"page"},{"location":"installation/","page":"Installation","title":"Installation","text":"cd into the directory and install hamutils:","category":"page"},{"location":"installation/","page":"Installation","title":"Installation","text":"cd hamutils\npip install .","category":"page"},{"location":"installation/#ML-Hamiltonians-for-Gold-Data","page":"Installation","title":"ML Hamiltonians for Gold Data","text":"","category":"section"},{"location":"installation/","page":"Installation","title":"Installation","text":"The scripts to run the tutorial and the provided models can be found on a GitHub repository. The repository can be cloned as follows:","category":"page"},{"location":"installation/","page":"Installation","title":"Installation","text":"git clone git@github.com:vitartas/ML_Hamiltonians_Gold.git","category":"page"},{"location":"installation/","page":"Installation","title":"Installation","text":"[1]: Zhang, L. et al. Equivariant analytical mapping of first principles Hamiltonians to accurate and transferable materials models. npj Comput Mater 8, 1-14 (2022).","category":"page"},{"location":"#Reproducible-Result","page":"Home","title":"Reproducible Result","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"This website describes how to predict Au(HCP) electronic density of states (DOS) which can be found in the HetSys Summer project called \"Machine Learning Hamiltonians for Gold\". This webpage contains Installation instructions and a Tutorial on how to reproduce the result found in the report. The tutorial also includes a method to obtain committee uncertainty[1] of the prediction which was not shown in the report.","category":"page"},{"location":"","page":"Home","title":"Home","text":"note: Note\nThe result obtained here does not exactly match the DOS in the report. This is because the model was retrained with a more robust implementation of Bayesian Linear Regression (BLR) which uses a different optimisation method to obtain the most appropriate precision hyperparameters.","category":"page"},{"location":"#Committee-Uncertainty","page":"Home","title":"Committee Uncertainty","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Fitting the model with Bayesian Linear Regression yields an analytic posterior distibution of the coefficients mathbfc","category":"page"},{"location":"","page":"Home","title":"Home","text":"beginaligned\n    P(mathbfcmathcalY mathbfA alpha beta) = mathcalN(mathbfc mathbfm_N mathbfS_N)\nendaligned","category":"page"},{"location":"","page":"Home","title":"Home","text":"where mathcalY is a flattened vector of the fitted matrix sub-blocks, mathbfA is the design matrix that contains the descriptors evaluated on training configurations, and the analytic mean and variance of the posterior are given as","category":"page"},{"location":"","page":"Home","title":"Home","text":"beginaligned\n    mathbfm_N = beta mathbfS_NmathbfA^TmathcalYqquad\n    mathbfS_N = left( beta mathbfA^T mathbfA + alpha mathbfGamma^2 right)^-1\nendaligned","category":"page"},{"location":"","page":"Home","title":"Home","text":"where mathbfGamma is a diagonal smoothness prior that applies a larger regularisation penalty to the basis functions with a larger polynomial degree, and alpha and beta are hyperparameters corresponding to the precisions of the prior and the data, respectively. The linearity of the model also leads to an analytic expression of the evidence P(mathcalYmathbfA alpha beta), which enables to optimise the precision hyperparameters using L-BFGS.","category":"page"},{"location":"","page":"Home","title":"Home","text":"In order to obtain the uncertainty in the electronic Density of States (DOS), the analytic posterior can be sampled to obtain a committee of models mathbfc_i_i=1^N_mathrmcomm, and the DOS can be evaluated by each member of the committee, where N_mathrmcomm is the size of the committee. The obtained committee standard deviation serves as an uncertainty measure which is evaluated in this tutorial","category":"page"},{"location":"","page":"Home","title":"Home","text":"beginaligned\n    sigma_mathrmDOS(E) = sqrtfracsum_i=1^N_mathrmcomm left mathrmDOS(E  mathbfc_i) - langle mathrmDOS(E) rangle_mathrmcomm right^2N_mathrmcomm - 1\nendaligned","category":"page"},{"location":"","page":"Home","title":"Home","text":"[1]: Witt, W. C. et al. ACEpotentials.jl: A Julia implementation of the atomic cluster expansion. The Journal of Chemical Physics 159, 164101 (2023).","category":"page"},{"location":"tutorial/","page":"Tutorial","title":"Tutorial","text":"Pages = [\"tutorial.md\"]\nDepth = 3","category":"page"},{"location":"tutorial/#Tutorial","page":"Tutorial","title":"Tutorial","text":"","category":"section"},{"location":"tutorial/","page":"Tutorial","title":"Tutorial","text":"This tutorial outlines how to predict the density of states (DOS) of Au(HCP) together with committee uncertainty. The tutorial should only be run after installing the required Julia and Python packages as outlined in the Installation instructions.","category":"page"},{"location":"tutorial/","page":"Tutorial","title":"Tutorial","text":"The tutorial only includes the inference stage because training the models would require significant HPC resources. The trained Hamiltonian and overlap models are provided in the Models directory.","category":"page"},{"location":"tutorial/#Matrix-Inference","page":"Tutorial","title":"Matrix Inference","text":"","category":"section"},{"location":"tutorial/","page":"Tutorial","title":"Tutorial","text":"Estimated Time\n~15 mins","category":"page"},{"location":"tutorial/","page":"Tutorial","title":"Tutorial","text":"This section outlines how to predict the real-space Hamiltonian and overlap matrices of Au(HCP) using the provided models.","category":"page"},{"location":"tutorial/","page":"Tutorial","title":"Tutorial","text":"Once ML_Hamiltonians_Gold data has been cloned from GitHub, one should be able to find files called predict_matrices.jl and predict_matrices.sh. Both scripts contain some variables that should be changed:","category":"page"},{"location":"tutorial/","page":"Tutorial","title":"Tutorial","text":"Variable name Description Location Needs to be Changed\nACEH_DIR Directory path where ACEhamiltonians was installed. .sh YES\nJULIA_EXEC Julia executable name. .sh NO\nN_PROCS Number of processes used in the calculation. .sh NO\nML_Hamiltonians_Gold_path Path to the cloned ML_Hamiltonians_Gold repository. .jl NO\ncommittee_size Number of processes used in the calculation. .jl NO","category":"page"},{"location":"tutorial/","page":"Tutorial","title":"Tutorial","text":"Once the variables have been adjusted accordingly, the inference can be started by running the shell script as follows:","category":"page"},{"location":"tutorial/","page":"Tutorial","title":"Tutorial","text":"source predict_matrices.sh","category":"page"},{"location":"tutorial/","page":"Tutorial","title":"Tutorial","text":"warning: Warning\nMake sure the appropriate version of Julia is loaded from the SCRTP system before running this script. Julia should be loaded from the module system in the same way as in the Installation.","category":"page"},{"location":"tutorial/","page":"Tutorial","title":"Tutorial","text":"The script should start running in the background, generating a logger file nohup.out, and an HDF5 database file Au_hcp_committee.h5 which contains the predicted data. The script should take about ~15 minutes to finish (with N_PROCS=8).","category":"page"},{"location":"tutorial/#Post-Processing","page":"Tutorial","title":"Post-Processing","text":"","category":"section"},{"location":"tutorial/","page":"Tutorial","title":"Tutorial","text":"Estimated Time\n~10 mins","category":"page"},{"location":"tutorial/","page":"Tutorial","title":"Tutorial","text":"Once the matrix inference has been completed successfully, the predicted matrices can be used to obtain the electronic Density of States (DOS) for Au(HCP) with a committee uncertainty. The cloned repository should contain a Python file postprocess_data.py, which also has a ML_Hamiltonians_Gold_path variable as in the matrix inference stage, and it might have to be adjusted accordingly. The script can be run as follows:","category":"page"},{"location":"tutorial/","page":"Tutorial","title":"Tutorial","text":"python postprocess_data.py","category":"page"},{"location":"tutorial/","page":"Tutorial","title":"Tutorial","text":"warning: Warning\nMake sure the hamutils package is available in your Python environment. Before running the script above, one should activate the Python environment with hamutils as in the Installation.","category":"page"},{"location":"tutorial/","page":"Tutorial","title":"Tutorial","text":"The script should take about 10 minutes to finish, after which a file called Au_hcp_DOS.pdf should be visible in the cloned repository. The expected result is shown in the figure below.","category":"page"},{"location":"tutorial/","page":"Tutorial","title":"Tutorial","text":"(Image: Au(HCP) predicted Density of States)","category":"page"}]
}
