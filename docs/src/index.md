# Reproducible Result

This website describes how to predict Au(HCP) electronic density of states (DOS) which can be found in the HetSys Summer project called "Machine Learning Hamiltonians for Gold". This webpage contains [Installation](installation.md) instructions and a [Tutorial](tutorial.md) on how to reproduce the result found in the report. The tutorial also includes a method to obtain committee uncertainty[^1] of the prediction which was not shown in the report.

!!! note
    The result obtained here does not exactly match the DOS in the report. This is because the model was retrained with a more robust implementation of Bayesian Linear Regression (BLR) which uses a different optimisation method to obtain the most appropriate precision hyperparameters.

[^1]: Witt, W. C. et al. ACEpotentials.jl: A Julia implementation of the atomic cluster expansion. The Journal of Chemical Physics **159**, 164101 (2023).