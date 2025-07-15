import { renderRemainingCards, renderScores, renderCards } from "./utils/render.js"

// buttons
const newGameBtn = document.getElementById('new-game')
const drawCardBtn = document.getElementById('draw-card-btn')
// titles & texts
const remainingCards = document.getElementById('remaining-cards')
const title = document.getElementById('title')
// scores
const botScore = document.getElementById('bot-score')
const playerScore = document.getElementById('player-score')
// cards containers
const botCards = document.getElementById('bot-cards')
const playerCards = document.getElementById('player-cards')
// choices cards
const playerChoice = document.getElementById('player-choice')
const botChoice = document.getElementById('bot-choice')

let deckId;
let remainingCardsValue;

// initial scores
let botScoreValue = 0;
let playerScoreValue = 0;

// cards
let cardsArr = []
let botCardsArr = []
let playerCardsArr = []

// game points system
const points = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING', 'ACE']

checkRemainingCards()

// event listeners
document.addEventListener('click', (e) => {
    e.target.dataset.cardValue && playCard(e)
})

newGameBtn.addEventListener('click', () => {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => res.json())
    .then(data => {
        deckId = data.deck_id
        remainingCardsValue = data.remaining
        resetScore()
        renderRemainingCards(remainingCards, remainingCardsValue)
        renderScores(botScore, playerScore, botScoreValue, playerScoreValue)
        checkRemainingCards()
    })
})

drawCardBtn.addEventListener('click', () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=6`)
    .then(res => res.json())
    .then(data => {
        title.textContent = 'Playing Round'
        hidePlayersChoices()
        remainingCardsValue = data.remaining
        renderRemainingCards(remainingCards, remainingCardsValue)
        cardsArr = data.cards
        fillCardsArrays()
        renderCards(botCards, playerCards, botCardsArr, playerCardsArr)
        checkRemainingCards()
    })
})

function resetScore() {
    botScoreValue = 0
    playerScoreValue = 0
}

function checkRemainingCards() {
    drawCardBtn.style.display = !deckId || 
    remainingCardsValue === 0  ||
    (deckId && remainingCardsValue > 0 && (botCardsArr.length > 0 && playerCardsArr.length > 0)) ? 'none' : 'flex'
}

function fillCardsArrays() {
    cardsArr.forEach((el, index) => {
        index % 2 === 0 ?
        botCardsArr.push({image: el.image, value: el.value}) :
        playerCardsArr.push({image: el.image, value: el.value})
    })
}

function playCard(e) {
    const playedCard = playerCardsArr.find((el, index) => {
        return el.value === e.target.dataset.cardValue && index === parseInt(e.target.dataset.cardIndex)
    })
    playerChoice.innerHTML = `
        <div class="card">
            <button>
                <img src="${playedCard.image}" alt="played card">
            </button>
        </div>
    `
    playerCardsArr = playerCardsArr.filter(el => el !== playedCard)
    renderCards(botCards, playerCards, botCardsArr, playerCardsArr)

    const botPlayedCard = botCardsArr[Math.floor(Math.random() * botCardsArr.length)]
    botChoice.innerHTML = `
        <div class="card">
            <button>
                <img src="${botPlayedCard.image}" alt="bot played card">
            </button>
        </div>
    `
    botCardsArr = botCardsArr.filter(el => el !== botPlayedCard)
    renderCards(botCards, playerCards, botCardsArr, playerCardsArr)

    title.textContent = decideRoundWinner(playedCard, botPlayedCard)
    renderScores(botScore, playerScore, botScoreValue, playerScoreValue)

    checkRemainingCards()
}

function decideRoundWinner(playedCard, botPlayedCard) {
    let winner;
    const playerPoints = points.indexOf(playedCard.value)
    const botPoints = points.indexOf(botPlayedCard.value)
    winner = playerPoints > botPoints ? 'You won this round!' :
    botPoints > playerPoints ? 'Bot won this round!' :
    'Tie'
    winner === 'You won this round!' && playerScoreValue ++
    winner === 'Bot won this round!' && botScoreValue ++
    return winner
}

function hidePlayersChoices() {
    playerChoice.innerHTML = ''
    botChoice.innerHTML = ''
}
