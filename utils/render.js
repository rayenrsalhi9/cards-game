export function renderRemainingCards(remainingCards, n) {
    remainingCards.textContent = `Remaining Cards: ${n}`
}

export function renderScores(botScore, playerScore, botScoreValue, playerScoreValue) {
    botScore.textContent = `Bot: ${botScoreValue}`
    playerScore.textContent = `You: ${playerScoreValue}`
}

export function renderCards(botCards, playerCards, botCardsArr, playerCardsArr) {
    botCards.innerHTML = botCardsArr.map(el => `
            <div class="card">
                <img src="${el}" alt="card">
            </div>
    `).join('')
    playerCards.innerHTML = playerCardsArr.map((el, index) => `
            <div class="card">
                <button data-index="${index}">
                    <img src="${el}" alt="card">
                </button>
            </div>
    `).join('')
}