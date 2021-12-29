// initial data

let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
}
let play = '';
let warning = '';
let playing = false;

reset();

// events
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});

// functions
function itemClick(event) {
    // target tem o elemento que foi clicado
    let item = event.target.getAttribute('data-item');

    // marca o local em que foi clicado
    if (playing && square[item] === '') {
        square[item] = player;
        
        renderSquare();
        togglePlayer();
    }
}

function reset() {
    warning = '';

    let random = Math.floor(Math.random() * 2);
    /*if (random === 0) {
        player = 'x';
    }
    else {
        player = 'o';
    }*/
    player = (random === 0) ? 'x' : 'o';
    
    for (let i in square) {
        square[i] = '';
    }

    playing = true;

    renderSquare();
    renderInfo();
}

function renderSquare() {
    for (let i in square) {
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];
    }

    checkGame();
}

function renderInfo() {
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
}

function togglePlayer() {
    // alterna x e o
    player = (player === 'x') ? 'o' : 'x';
    renderInfo();
}

function checkGame() {
    // verifica se x ganhou, ou se o ganhou, ou se empatou, ou se não aconteceu nada
    if (checkWinnerFor('x')) {
        warning = 'O "x" venceu!';
        playing = false;
    } else if (checkWinnerFor('o')) {
        warning = 'O "o" venceu!';
        playing = false;
    } else if (isFull()) {
        warning = 'Deu empate!';
        playing = false;
    }
}

function checkWinnerFor(player) {
    // possibilidades de vitória
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for (let w in pos) {
        let pArray = pos[w].split(','); // a1, a2, a3
        let hasWon = pArray.every(option => square[option] === player);

        // se venceu
        if (hasWon) {
            return true;
        }
    }

    // não venceu
    return false;
}

function isFull() {
    // função de empate
    for (let i in square) {
        if (square[i] === '') {
            return false;
        }
    }
    return true;
}