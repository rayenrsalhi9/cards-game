import { renderRemainingCards, renderScores } from "./utils/render.js"

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

// initial scores
let botScoreValue = 0;
let playerScoreValue = 0;

// event listeners
newGameBtn.addEventListener('click', () => {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => res.json())
    .then(data => {
        deckId = data.deck_id
        resetScore()
        renderRemainingCards(remainingCards, data.remaining)
        renderScores(botScore, playerScore, botScoreValue, playerScoreValue)
    })
})

function resetScore() {
    botScoreValue = 0
    playerScoreValue = 0
}