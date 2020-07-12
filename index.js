//all nodes started with "$"
const $start = document.querySelector('#start')
const $game = document.querySelector('#game')
const $time = document.querySelector('#time')
const $timeHeader = document.querySelector('#time-header')
const $resultHeader = document.querySelector('#result-header')
const $result = document.querySelector('#result')
const $gameTime = document.querySelector('#game-time')

let score = 0
let isGameStarted = false

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)

function show($el) {
    $el.classList.remove('hide')
}

function hide($el) {
    $el.classList.add('hide')
}

function startGame() {
    score = 0
    setGameTime()
    renderBox()
    $gameTime.setAttribute('disabled', 'true')
    isGameStarted = true
    $game.style.backgroundColor = '#fff'
    hide($start)

    renderBox()

    const internal = setInterval(function () {
        const time = parseFloat($time.textContent)
        if (time <= 0) {
            clearInterval(internal)
            endGame()
        } else {
            $time.textContent = (time - 0.1).toFixed(1)
        }
    }, 100)
}


function renderBox() {
    const boxSize = getRandom(30, 80)
    const box = document.createElement('div')
    const gameSize = $game.getBoundingClientRect()
    //метод выдаёт размер просматриваемого Node(узла)

    const maxTop = gameSize.height - boxSize
    const maxLeft = gameSize.width - boxSize

    $game.innerHTML = ''

    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = getRandomColorForBox()
    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
    box.setAttribute('data-box', 'true')

    $game.insertAdjacentElement('afterbegin', box)
}

function getRandom(min, max) {
    return Math.round(Math.random() * (max - min) + min)
    //в диапазоне от min - max будем вытаскивать рандомное число
}
function getRandomColorForBox() {
    let с = Math.floor(Math.random()*220).toString(16);
    return "#"+с+с+с;
}

function handleBoxClick(event) {
    if (!isGameStarted) {
        return
    }
    if (event.target.dataset.box) {
        score++
        renderBox()
    }
}

function setGameTime() {
    let time = +$gameTime.value
    $time.textContent = time.toFixed(1)
    show($timeHeader)
    hide($resultHeader)
}

function setGameScore() {
    $result.textContent = score.toString()
}

function endGame() {
    isGameStarted = false
    setGameScore()
    $gameTime.removeAttribute('disabled')
    show($start)
    $game.style.backgroundColor = '#ccc'
    $game.innerHTML = ''
    hide($timeHeader)
    show($resultHeader)
    show($result)
}



