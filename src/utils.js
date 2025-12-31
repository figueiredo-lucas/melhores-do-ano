export const getMaisVotado = (currentQuestion, users, external) => {

    if (!currentQuestion?.votes) return null

    let name = null
    
    if (currentQuestion.overrides) {
        
        name = currentQuestion.overrides
        
        const u1 = external[name] || users[name] || {}
        
        return {
            name,
            nickname: u1.nickname || name,
            imgUrl: u1.imgUrl
        }
        
    } else {
        
        const votes = Object.values(currentQuestion.votes).reduce((acc, curr) => {
            acc[curr] = (acc[curr] || 0) + 1
            return acc
        }, {})
        
        const sortedVotes = Object.keys(votes).sort((a, b) => votes[b] - votes[a])
        const winners = sortedVotes.filter(k => votes[k] === votes[sortedVotes[0]])

        name = winners[Math.floor(Math.random() * winners.length)]
        
    }
    
    if (currentQuestion.couples) {
        const ppl = name.split('|')
        
        const u1 = external[ppl[0]] || users[ppl[0]] || {}
        const u2 = external[ppl[1]] || users[ppl[1]] || {}
        
        return [{
            name: ppl[0],
            nickname: u1.nickname || ppl[0],
            imgUrl: u1.imgUrl
        }, {
            name: ppl[1],
            nickname: u2.nickname || ppl[1],
            imgUrl: u2.imgUrl
        }]
    }
    
    return users[name]

}