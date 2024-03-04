// Registrando Jogadores
const players = []
let playerSymbolMoment = "X"
let spamPlayerMoment = document.querySelector("#playerMoment")
let jsTable = ["", "", "", "", "", "", "", "", ""]
const streaksWin = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

const form = document.getElementById("form")
form.addEventListener("submit", (ev) => {
    ev.preventDefault()

    if (form.inputPlayerX.value == "" || form.inputPlayerO.value == "") {
        alert("Preencha os nick de todos os jogadores")
    } else {
        players.push(
            { nick: form.inputPlayerX.value, simbol: "X" },
            { nick: form.inputPlayerO.value, simbol: "O" }
        )
        spamPlayerMoment.innerText = checkPlayerMoment().nick
        form.inputPlayerO.value = ""
        form.inputPlayerX.value = ""

        init()
    }
})

// Trocando a vez do Jogador
function checkPlayerMoment() {
    return players.find((player) => player.simbol == playerSymbolMoment)
}

function togglePlayer() {
    playerSymbolMoment = playerSymbolMoment == "X" ? "O" : "X"
    spamPlayerMoment.innerText = checkPlayerMoment().nick
}

function init() {
    let regions = document.querySelectorAll(".region")

    regions.forEach((region) => {
        region.innerText = ""
        region.addEventListener("click", clickAction)
    })

    jsTable = ["", "", "", "", "", "", "", "", ""]
    document.getElementById("winner").innerText = ""
}

function clickAction(ev) {
    let region = ev.currentTarget
    region.innerText = playerSymbolMoment
    jsTable[region.dataset.region] = playerSymbolMoment
    let winner = checkWinner()
    if (winner) {
        document.getElementById("winner").innerText = `O ganhador foi ${checkPlayerMoment().nick}`
        document.querySelectorAll(".region").forEach((region) => {
            region.removeEventListener("click", clickAction)
        })
    } else {
        togglePlayer()
        region.removeEventListener("click", clickAction)
    }
}

function checkWinner() {
    for (let i in streaksWin) {
        if (
            jsTable[streaksWin[i][0]] == "X" &&
            jsTable[streaksWin[i][1]] == "X" &&
            jsTable[streaksWin[i][2]] == "X"
        ) {
            return "X"
        } else if (
            jsTable[streaksWin[i][0]] == "O" &&
            jsTable[streaksWin[i][1]] == "O" &&
            jsTable[streaksWin[i][2]] == "O"
        ) {
            return "O"
        }
    }

    return false
}