// GENERAL VARIABLES

const inputTeamsNumber = document.querySelector('.teams-number-input');
const inputTeamsSize = document.querySelector('.teams-size-input');
const inputPlayers = document.querySelector('.players-input');

const btnTeamsNumber = document.querySelector('.teams-number-button');
const btnTeamsSize = document.querySelector('.teams-size-button');
const btnPlayers = document.querySelector('.players-button');

const btnDraw = document.querySelector('.draw');

const restart = document.querySelector('.restart');
const restartMobile = document.querySelector('.restart.mobile');

const playersArray = [];

// RESTART APP

restart.addEventListener('click', () => {
    window.location.reload();
})

restartMobile.addEventListener('click', () => {
    window.location.reload();
})

// DEFAULT FOCUS FIRST INPUT

document.addEventListener('load', inputTeamsNumber.focus());

// INSERT TEAMS NUMBER AND CREATE DIVS FOR DRAW RESULT DISPLAY

const acceptTeamsNumber = (e) => {
    e.preventDefault();
    let teamNo = 0;
    if (inputTeamsNumber.value >= 2 && inputTeamsNumber.value <= 4) {
        for (let i = 0; i < inputTeamsNumber.value; i++) {
            const divForEachTeam = document.createElement('div');
            document.querySelector('.result').appendChild(divForEachTeam);
            const h2ForchEachDiv = document.createElement('h2');
            document.querySelectorAll('.result div').forEach(div => div.appendChild(h2ForchEachDiv));
        }
        document.querySelectorAll('.result div').forEach(div => div.classList.add(`team${++teamNo}`));
        teamNo = 0;
        document.querySelectorAll('.result div h2').forEach(h2 => h2.textContent = `Zespół ${++teamNo}:`);
        document.querySelector('.teams-number').classList.remove('active');
        document.querySelector('.teams-size').classList.add('active');
        inputTeamsSize.focus();
    } else {
        alert('Aby przejść dalej, wprowadź poprawną liczbę drużyn (od 2 do 4).');
        inputTeamsNumber.value = '';
        inputTeamsNumber.focus();
    }
}

btnTeamsNumber.addEventListener('click', acceptTeamsNumber)

// INSERT EACH TEAM SIZE

const acceptTeamsSize = (e) => {
    e.preventDefault();
    if (inputTeamsSize.value >= 1 && inputTeamsSize.value <= 11) {
        document.querySelector('.teams-size').classList.remove('active');
        document.querySelector('.players').classList.add('active');
        document.querySelector('.player-list').classList.add('active');
        inputPlayers.focus();
    } else {
        alert('Aby przejść dalej, wprowadź poprawną liczbę zawodników w każdym zespole (max 11).');
        inputTeamsSize.value = '';
        inputTeamsSize.focus();
    }
}

btnTeamsSize.addEventListener('click', acceptTeamsSize);

// ADD NEW PLAYERS AND SHOW THEM IN PLAYERS LIST; ADD EACH PLAYER TO ARRAY

const sectionPlayerListDiv = document.querySelector('.player-list div');

let n = 0;

const addPlayerToList = () => {
    const newPlayerParagraph = document.createElement('p');
    const deleteIcon = document.createElement('i');
    deleteIcon.className = 'far fa-times-circle delete-btn';
    deleteIcon.addEventListener('click', removePlayerFromListAndArray);
    newPlayerParagraph.textContent = `${++n}. ${inputPlayers.value}`;
    sectionPlayerListDiv.appendChild(newPlayerParagraph);
    newPlayerParagraph.appendChild(deleteIcon);
}

const addPlayerToArray = () => {
    playersArray.push(inputPlayers.value);
}

const cancelAnimateInsertPlayerBtn = () => {
    btnPlayers.className = "players-button";
}

const playerInsert = (e) => {
    e.preventDefault();
    btnPlayers.className = "players-button animate";
    setTimeout(cancelAnimateInsertPlayerBtn, 500);

    if (inputPlayers.value !== '' && inputPlayers.value !== ' ') {
        addPlayerToList();
        addPlayerToArray();
        inputPlayers.value = '';
        inputPlayers.focus();
    } else {
        alert('Wprowadź dane zawodnika!');
        inputPlayers.focus();
    }

    if (playersArray.length == inputTeamsSize.value * inputTeamsNumber.value) {
        alert('Wprowadziłeś wszystkich zawodników, możesz przejść do losowania!');
        document.querySelector('.players').classList.remove('active');
        btnDraw.classList.add('active');
    }
}

btnPlayers.addEventListener('click', playerInsert);

// DELETE SINGLE PLAYER FROM PLAYER LIST AND ARRAY

const deletePlayer = document.getElementsByClassName('delete-btn');

const removePlayerFromListAndArray = (e) => {
    const deletePlayerArray = [...deletePlayer];
    e.target.parentNode.remove();
    const deletedIndex = deletePlayerArray.indexOf(e.target);
    playersArray.splice(deletedIndex, 1);
    sectionPlayerListDiv.textContent = '';
    n = 0;
    for (let i = 0; i < playersArray.length; i++) {
        const newPlayerParagraph = document.createElement('p');
        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'far fa-times-circle delete-btn';
        deleteIcon.addEventListener('click', removePlayerFromListAndArray);
        newPlayerParagraph.textContent = `${++n}. ${playersArray[i]}`;
        sectionPlayerListDiv.appendChild(newPlayerParagraph);
        newPlayerParagraph.appendChild(deleteIcon);
        inputPlayers.focus();
    }
    if (playersArray.length < inputTeamsSize.value * inputTeamsNumber.value) {
        document.querySelector('.players').classList.add('active');
        btnDraw.classList.remove('active');
        inputPlayers.focus();
    }
}

// DRAW

let playerNoTeam1 = 0;
let playerNoTeam2 = 0;
let playerNoTeam3 = 0;
let playerNoTeam4 = 0;

const drawTeams = () => {
    const initialPlayersArrayLength = playersArray.length;
    const resultDiv1 = document.querySelector(`.result div.team1`);
    const resultDiv2 = document.querySelector(`.result div.team2`);
    const resultDiv3 = document.querySelector(`.result div.team3`);
    const resultDiv4 = document.querySelector(`.result div.team4`);

    for (let i = 0; i < initialPlayersArrayLength; i++) {
        const playerParagraph = document.createElement('p');
        const drawnPlayer = playersArray.splice(Math.floor(Math.random() * playersArray.length), 1);
        playerParagraph.textContent = drawnPlayer;

        if (inputTeamsNumber.value == 2) {
            if (resultDiv1.childElementCount - 1 < inputTeamsSize.value) {
                playerParagraph.textContent = ++playerNoTeam1 + ". " + playerParagraph.textContent;
                resultDiv1.appendChild(playerParagraph);
            } else {
                playerParagraph.textContent = ++playerNoTeam2 + ". " + playerParagraph.textContent;
                resultDiv2.appendChild(playerParagraph);
            }
        } else if (inputTeamsNumber.value == 3) {
            if (resultDiv1.childElementCount - 1 < inputTeamsSize.value) {
                playerParagraph.textContent = ++playerNoTeam1 + ". " + playerParagraph.textContent;
                resultDiv1.appendChild(playerParagraph);
            } else if (resultDiv2.childElementCount - 1 < inputTeamsSize.value) {
                playerParagraph.textContent = ++playerNoTeam2 + ". " + playerParagraph.textContent;
                resultDiv2.appendChild(playerParagraph);
            } else {
                playerParagraph.textContent = ++playerNoTeam3 + ". " + playerParagraph.textContent;
                resultDiv3.appendChild(playerParagraph);
            }
        } else {
            if (resultDiv1.childElementCount - 1 < inputTeamsSize.value) {
                playerParagraph.textContent = ++playerNoTeam1 + ". " + playerParagraph.textContent;
                resultDiv1.appendChild(playerParagraph);
            } else if (resultDiv2.childElementCount - 1 < inputTeamsSize.value) {
                playerParagraph.textContent = ++playerNoTeam2 + ". " + playerParagraph.textContent;
                resultDiv2.appendChild(playerParagraph);
            } else if (resultDiv3.childElementCount - 1 < inputTeamsSize.value) {
                playerParagraph.textContent = ++playerNoTeam3 + ". " + playerParagraph.textContent;
                resultDiv3.appendChild(playerParagraph);
            } else {
                playerParagraph.textContent = ++playerNoTeam4 + ". " + playerParagraph.textContent;
                resultDiv4.appendChild(playerParagraph);
            }
        }
    }

    document.querySelector('.player-list').classList.remove('active');
    btnDraw.classList.remove('active');
    document.querySelectorAll('.result div h2').forEach((h2) => h2.classList.add('active-h2'));
    restart.classList.add('move');
    restartMobile.classList.add('move');
}

btnDraw.addEventListener('click', drawTeams);