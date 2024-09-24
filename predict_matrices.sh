#!/bin/bash

# Change the `ACEH_DIR` variable with a path to the directory where `ACEhamiltonians.jl` was installed.
ACEH_DIR="ACEhamiltonians.jl"

# If julia was loaded using the SCRTP module system, julia should automatically be in the PATH.
JULIA_EXEC=julia

# Feel free to change the number of processes.
N_PROCS=4

nohup $JULIA_EXEC -p $N_PROCS --project=$ACEH_DIR predict_matrices.jl &
