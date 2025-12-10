export const getMaisVotado = (currentQuestion, users) => {

    if (!currentQuestion?.votes) return null

    const votos = Object.values(currentQuestion.votes).reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1
        return acc
    }, {})

    const nome = Object.keys(votos).sort((a, b) => votos[b] - votos[a])[0]

    return users[nome]

}