```@contents
Pages = ["installation.md"]
Depth = 3
```

# Installation

This section describes how to install software and packages that are required in order to reproduce the Au(HCP) electronic density of states (DOS) as shown in the [Tutorial](tutorial.md).

It is assumed that both the installation and the tutorial will be run on University of Warwick SCRTP systems, such as `hetmathsys` nodes.

## Julia

On SCRTP systems Julia 1.10.4 can be loaded using the module system as follows:

```bash
module purge
module load Julia/1.10.4-linux-x86_64
```

## ACEhamiltonians

ACEhamiltonians is a Julia package which is used to perform training and inference of real-space Hamiltonians and overlap matrices.[^1]

### Download

First, `ACEhamiltonians` can be obtained by cloning the repository from [GitHub](https://github.com/vitartas/ACEhamiltonians.jl/tree/committee):

```
git clone git@github.com:vitartas/ACEhamiltonians.jl.git
```

!!! warning
    The snippet above might not work if you have not set up an SSH key on GitHub. In that case the code must be replaced with `git clone https://github.com/ACEsuit/ACEhamiltonians.jl.git`.

Once the repository has been cloned, `cd` into the directory and switch to the `committee` branch as follows:

```bash
cd ACEhamiltonians.jl
git switch committee
```

### Install

The code together with its dependencies can be installed as shown below.

First, activate the `ACEhamiltonians.jl` Julia environment (while in `ACEhamiltonians.jl` directory):

```
julia --project=.
```

!!! warning
    It was found that running this script inside a VSCode terminal can sometimes lead to unsuccessful installation of packages. Therefore, it is advised to run Julia inside a separate linux terminal.

Run the following code inside Julia to install `ACEhamiltonians` with its dependencies:

```Julia
using Pkg

# Add MolSim registry
Pkg.Registry.add(RegistrySpec(url="https://github.com/JuliaMolSim/MolSim.git"))
# Add newer ACE registry
Pkg.Registry.add(RegistrySpec(url="https://github.com/ACEsuit/ACEregistry.git"))
# Readd General registry for stability
Pkg.Registry.add("General")

# Instantiate the environment from the `Project.toml` file
Pkg.instantiate()
```

After the installation, the Julia session can be exited. To ensure `ACEhamiltonians` was installed successfully, a new Julia session can be started as before, and `using ACEhamiltonians` can be run inside Julia, which should return no errors if the installation was successful.

## Hamutils

In order to post-process the results of the Hamiltonian prediction, an additional Python package [hamutils](https://github.com/vitartas/hamutils) was written. It is advised to create a separate Python environment (e.g. virtual or conda) when installing this package.

### Python Venv

How to create and activate a Python environment on SCRTP systems is shown below.

Load an appropriate Python version from the module system:

```shell
module load GCCcore/12.3.0 Python/3.11.3
```

Create and activate a virtual environment:

```shell
python -m venv ham_venv
source ham_venv/bin/activate
```

### Download & Install

Once the environment is activated, the `hamutils` package can be installed as follows:

Clone `hamutils` from [GitHub](https://github.com/vitartas/hamutils):

```
git clone git@github.com:vitartas/hamutils.git
```

`cd` into the directory and install `hamutils`:

```
cd hamutils
pip install .
```

!!! note
    If the package was installed into a virtual environment, do not forget to activate the environment when running the tutorial.

[^1]: Zhang, L. et al. Equivariant analytical mapping of first principles Hamiltonians to accurate and transferable materials models. npj Comput Mater **8**, 1-14 (2022).
