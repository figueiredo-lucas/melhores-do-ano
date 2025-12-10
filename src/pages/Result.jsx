import { useMemo } from "react"
import { useEffect } from "react"
import { useRepo } from "../hooks/useRepo"
import { useState } from "react"
import Cofre from "../components/Cofre/Cofre"
import PortaMoeda from "../components/PortaMoeda/PortaMoeda"
import { useDataListener } from "../hooks/useDataListener"
import Cartas from "../components/Cartas/Cartas"

const Result = () => {

    const questionsRepo = useRepo('questions')

    const [questions, setQuestions] = useState({})
    const [users, setUsers] = useState({})

    const currentQuestion = useMemo(() => {
        if (!questions || !questions.items || questions.items.length === 0)
            return { title: '' }

        return questions.items[questions.current]
    }, [questions])

    useEffect(() => {

        const unsubscribe = questionsRepo.listen(setQuestions)

        return () => {
            unsubscribe()
        }

    }, [questionsRepo])

    useDataListener('users', setUsers)

    return (
        <div>
            {/* <PortaMoeda currentQuestion={currentQuestion} users={users} />
            <Cofre /> */}

            <Cartas />
        </div>
    )
}

export default Result