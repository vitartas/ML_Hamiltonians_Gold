using Documenter

makedocs(
    sitename="ML Hamiltonians for Gold",
    pages=[
        "Home" => "index.md",
        "Installation" => "installation.md",
        "Tutorial" => "tutorial.md"
    ]
)

deploydocs(
    repo="github.com/vitartas/ML_Hamiltonians_Gold.git"
)