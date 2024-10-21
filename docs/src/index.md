# Reproducible Result

This website describes how to predict Au(HCP) electronic density of states (DOS) which can be found in the HetSys Summer project called "Machine Learning Hamiltonians for Gold". This webpage contains [Installation](installation.md) instructions and a [Tutorial](tutorial.md) on how to reproduce the result found in the report. The tutorial also includes a method to obtain committee uncertainty[^1] of the prediction which was not shown in the report.

!!! note
    The result obtained here does not *exactly* match the DOS in the report. This is because the model was retrained with a more robust implementation of Bayesian Linear Regression (BLR) which uses a different optimisation method to obtain the most appropriate precision hyperparameters.

## Committee Uncertainty

Fitting the model with Bayesian Linear Regression yields an analytic posterior distibution of the coefficients $\mathbf{c}$

```math
\begin{aligned}
    P(\mathbf{c}|\mathcal{Y}, \mathbf{A}, \alpha, \beta) = \mathcal{N}(\mathbf{c}| \mathbf{m}_{N}, \mathbf{S}_{N})\,,
\end{aligned}
```

where $\mathcal{Y}$ is a flattened vector of the fitted matrix sub-blocks, $\mathbf{A}$ is the design matrix that contains the descriptors evaluated on training configurations, and the analytic mean and variance of the posterior are given as

```math
\begin{aligned}
    \mathbf{m}_{N} = \beta \mathbf{S}_{N}\mathbf{A}^{T}\mathcal{Y}\,,\qquad\\
    \mathbf{S}_{N} = \left( \beta \mathbf{A}^{T}\! \mathbf{A} + \alpha \mathbf{\Gamma}^{2} \right)^{-1}\,,
\end{aligned}
```

where $\mathbf{\Gamma}$ is a diagonal smoothness prior that applies a larger regularisation penalty to the basis functions with a larger polynomial degree, and $\alpha$ and $\beta$ are hyperparameters corresponding to the precisions of the prior and the data, respectively. The linearity of the model also leads to an analytic expression of the evidence $P(\mathcal{Y}|\mathbf{A}, \alpha, \beta)$, which enables to optimise the precision hyperparameters using L-BFGS.

In order to obtain the uncertainty in the electronic Density of States (DOS), the analytic posterior can be sampled to obtain a committee of models $\{\mathbf{c}_{i}\}_{i=1}^{N_{\mathrm{comm}}}$, and the DOS can be evaluated by each member of the committee, where $N_{\mathrm{comm}}$ is the size of the committee. The obtained committee standard deviation serves as an uncertainty measure which is evaluated in this tutorial

```math
\begin{aligned}
    \sigma_{\mathrm{DOS}}(E) = \sqrt{\frac{\sum_{i=1}^{N_{\mathrm{comm}}} \left[ \mathrm{DOS}(E | \mathbf{c}_{i}) - \langle \mathrm{DOS}(E) \rangle_{\mathrm{comm}} \right]^2}{N_{\mathrm{comm}} - 1}}\,.
\end{aligned}
```

[^1]: Witt, W. C. et al. ACEpotentials.jl: A Julia implementation of the atomic cluster expansion. The Journal of Chemical Physics **159**, 164101 (2023).