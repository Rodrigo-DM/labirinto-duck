const map = [
    "WWWWWWWWWWWWWWWWWWWWW",
    "W   W     W     W W W",
    "W W W WWW WWWWW W W W",
    "W W W   W     W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW WWWWW WWWWW W W",
    "W W   W   W W     W W",
    "W WWWWW W W W WWW W F",
    "S     W W W W W W WWW",
    "WWWWW W W W W W W W W",
    "W     W W W   W W W W",
    "W WWWWWWW WWWWW W W W",
    "W       W       W   W",
    "WWWWWWWWWWWWWWWWWWWWW",
];

const montarDivs = (value, container) => {
    const linha = document.createElement('div');
    linha.classList = ('linha');

    for (let i = 0; i < value.length; i++) {
        if (value[i] === 'W') {
            const celula = document.createElement('div');
            
            celula.classList = ('parede');
            linha.appendChild(celula);

        } else {
            const space = document.createElement('div');

            space.classList = ('vazio');

            if (value[i] === 'F') {
                space.id = 'chegada';
            }

            linha.appendChild(space);

            if (value[i] === 'S') {
                const personagem = document.createElement('img');

                personagem.src = './assets/img/personagem.png';
                personagem.id = 'player';

                space.appendChild(personagem);
            }
        }
    }

    container.appendChild(linha);
}

const construirLabrinto = () => {
    const container = document.getElementById('map');
    map.forEach((value) => montarDivs(value, container));
}

const btnModal = document.getElementById('btn-modal');

btnModal.addEventListener('click', () => {
    const modal = document.getElementById('modal-inicial');
    modal.classList.add('hidden');
})

const chamarModal = (time, position) => {
    const modal = document.getElementsByClassName('modal')[position];

    setTimeout(() => {
        modal.classList.remove('hidden');

    }, time)
}

const btnIniciar = document.getElementById('iniciar');

btnIniciar.addEventListener('click', () => {
    const container = document.getElementById('map');
    container.innerHTML = '';
    btnIniciar.classList.add('hidden');

    personLinha = 450;
    personColuna = 0;

    construirLabrinto();
    const portaLeft = document.getElementById('left');
    const portaRight = document.getElementById('right');

    portaLeft.classList.add('anima');
    portaRight.classList.add('anima');

    setTimeout(() => {
        portaLeft.classList.remove('anima');
        portaRight.classList.remove('anima');
        portaLeft.classList.add('hidden');
        portaRight.classList.add('hidden');
    }, 1450);

    chamarModal(1750, 0);
})

const mapear = () => {
    const space = document.querySelectorAll('.vazio');

    let caminho = [];

    for (let i = 0; i < space.length; i++) {
        let coord = [];

        coord[0] = space[i].offsetTop;
        coord[1] = space[i].offsetLeft;

        caminho.push(coord);
    }

    return caminho;
}

const findCoordenadas = (array, linha, coluna) => {
    let output = false;

    array.forEach(value => {
        if (value[0] === linha && value[1] === coluna) {
            output = true;
        }
    });

    return output;
}

const moveLinha = (array, signal, personagem) => {
    if (signal === 1) {
        personLinha -= 50;

    } else if (signal === 2) {
        personLinha += 50;
    }

    let validaCoord = findCoordenadas(array, personLinha, personColuna);

    if (validaCoord) {
        personagem.style.top = personLinha + 'px';

        if (personLinha === 400 && personColuna === 1000) {
            chamarModal(0, 1)
        }
    } else {
        if (signal === 1) {
            personLinha += 50;

        } else if (signal === 2) {
            personLinha -= 50;
        }
    }
}

const moveColuna = (array, signal, personagem) => {
    if (signal === 1) {
        personColuna -= 50;

    } else if (signal === 2) {
        personColuna += 50;
    }

    let validaCoord = findCoordenadas(array, personLinha, personColuna);

    if (validaCoord) {
        personagem.style.left = personColuna + 'px';

        if (personLinha === 400 && personColuna === 1000) {
            chamarModal(0, 1)
        }
    } else {
        if (signal === 1) {
            personColuna += 50;

        } else if (signal === 2) {
            personColuna -= 50;
        }
    }
}

let personLinha = 450;
let personColuna = 0;

document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    const personagem = document.getElementById('player');
    const caminho = mapear();

    if (keyName === 'ArrowUp') {
        moveLinha(caminho, 1, personagem);

    } else if (keyName === 'ArrowRight') {
        moveColuna(caminho, 2, personagem);

    } else if (keyName === 'ArrowDown') {
        moveLinha(caminho, 2, personagem);

    } else if (keyName === 'ArrowLeft') {
        moveColuna(caminho, 1, personagem);
    }
});

const btnSim = document.getElementById('final-y');

btnSim.addEventListener('click', () => {
    const modal = document.getElementsByClassName('modal')[1];
    modal.classList.add('hidden');
    const personagem = document.getElementById('player');

    personLinha = 450;
    personColuna = 0;

    personagem.style.top = personLinha + 'px';
    personagem.style.left = personColuna + 'px';
})

const btnNao = document.getElementById('final-n');

btnNao.addEventListener('click', () => {
    const modal = document.getElementsByClassName('modal')[1];
    modal.classList.add('hidden');

    const portaLeft = document.getElementById('left');
    const portaRight = document.getElementById('right');

    portaLeft.classList.add('anima2');
    portaRight.classList.add('anima2');

    portaLeft.style.width = 0;
    portaRight.style.width = 0;

    portaLeft.classList.remove('hidden');
    portaRight.classList.remove('hidden');

    setTimeout(() => {
        portaLeft.style.width = 50 + '%';
        portaRight.style.width = 50 + '%';
        btnIniciar.classList.remove('hidden')
    }, 1450);
})