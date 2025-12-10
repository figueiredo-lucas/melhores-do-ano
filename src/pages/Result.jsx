import { useMemo } from "react"
import { useEffect } from "react"
import { useRepo } from "../hooks/useRepo"
import { useState } from "react"
import Cofre from "../components/Cofre/Cofre"
import PortaMoeda from "../components/PortaMoeda/PortaMoeda"
import { useDataListener } from "../hooks/useDataListener"
import Cartas from "../components/Cartas/Cartas"
import { getMaisVotado } from "../utils"

const Result = () => {

    const questionsRepo = useRepo('questions')

    const [questions, setQuestions] = useState({})
    const [users, setUsers] = useState({})

    const currentQuestion = useMemo(() => {
        if (!questions || !questions.items || questions.items.length === 0)
            return { title: '' }

        return questions.items[questions.current]
    }, [questions])

    const maisVotado = getMaisVotado(currentQuestion, users)

    useEffect(() => {

        const unsubscribe = questionsRepo.listen(setQuestions)

        return () => {
            unsubscribe()
        }

    }, [questionsRepo])

    useDataListener('users', setUsers)

    return (
        <div>
            {/* <PortaMoeda currentQuestion={currentQuestion} maisVotado={maisVotado} users={users} />
            <Cofre /> */}

            <Cartas currentQuestion={currentQuestion} maisVotado={maisVotado} users={users} />
        </div>
    )
}

export default Result