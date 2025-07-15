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
                <img src="${el.image}" alt="card">
            </div>
    `).join('')
    playerCards.innerHTML = playerCardsArr.map((el, index) => `
            <div class="card" data-card-value="${el.value}" data-card-index="${index}">
                <button data-card-value="${el.value}" data-card-index="${index}">
                    <img src="${el.image}" alt="card" data-card-value="${el.value}" data-card-index="${index}">
                </button>
            </div>
    `).join('')
}