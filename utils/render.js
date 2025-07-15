export function renderRemainingCards(remainingCards, n) {
    remainingCards.textContent = `Remaining Cards: ${n}`
}

export function renderScores(botScore, playerScore, botScoreValue, playerScoreValue) {
    botScore.textContent = `Bot: ${botScoreValue}`
    playerScore.textContent = `You: ${playerScoreValue}`
}