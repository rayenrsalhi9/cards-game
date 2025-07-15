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
        remainingCardsValue = data.remaining
        renderRemainingCards(remainingCards, remainingCardsValue)
        checkRemainingCards()
        cardsArr = data.cards
        fillCardsArrays()
        renderCards(botCards, playerCards, botCardsArr, playerCardsArr)
    })
})

function resetScore() {
    botScoreValue = 0
    playerScoreValue = 0
}

function checkRemainingCards() {
    drawCardBtn.style.display = !deckId || remainingCardsValue === 0 ? 'none' : 'flex'
}

function fillCardsArrays() {
    cardsArr.forEach((el, index) => {
        index % 2 === 0 ?
        botCardsArr.push({image: el.image, value: el.value}) :
        playerCardsArr.push({image: el.image, value: el.value})
    })
}

function playCard(e) {
    const playedCard = playerCardsArr.find(el => el.value === e.target.dataset.cardValue)
    playerChoice.innerHTML = `
        <div class="card" data-card-value="${playedCard.value}">
            <button data-card-value="${playedCard.value}">
                <img src="${playedCard.image}" alt="card" data-card-value="${playedCard.value}">
            </button>
        </div>
    `
    playerCardsArr = playerCardsArr.filter(el => el.value !== playedCard.value)
    renderCards(botCards, playerCards, botCardsArr, playerCardsArr)

    const botPlayedCard = botCardsArr[Math.floor(Math.random() * botCardsArr.length)]
    botChoice.innerHTML = `
        <div class="card" data-card-value="${botPlayedCard.value}">
            <button data-card-value="${botPlayedCard.value}">
                <img src="${botPlayedCard.image}" alt="card" data-card-value="${botPlayedCard.value}">
            </button>
        </div>
    `
    botCardsArr = botCardsArr.filter(el => el.value !== botPlayedCard.value)
    renderCards(botCards, playerCards, botCardsArr, playerCardsArr)
}
