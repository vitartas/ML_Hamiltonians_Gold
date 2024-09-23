```@contents
Pages = ["tutorial.md"]
Depth = 3
```

# Tutorial

This tutorial outlines how to predict the density of states (DOS) of Au(HCP) together with committee uncertainty. The tutorial should only be run after installing the required Julia and Python packages as outlined in the [Installation](installation.md) instructions.

The tutorial only includes the inference stage because training the models would require significant HPC resources. The trained Hamiltonian and overlap models are provided in the [Models](https://github.com/vitartas/ML_Hamiltonians_Gold/models) directory.

## Matrix Inference

This section outlines how to predict the real-space Hamiltonian and overlap matrices of Au(HCP) using the provided models.

