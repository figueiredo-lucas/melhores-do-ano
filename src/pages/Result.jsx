import { useMemo } from "react"
import Cofre from "../components/Cofre/Cofre"
import { useDataListener } from "../hooks/useDataListener"
import Cartas from "../components/Cartas/Cartas"
import { getMaisVotado } from "../utils"
import { useRepo } from "../hooks/useRepo"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useCallback } from "react"

const ANIMATIONS = [
    Cofre,
    Cartas,
]

const Result = () => {

    const users = useDataListener('users')
    const questions = useDataListener('questions')
    const questionsRepo = useRepo('questions')

    const navigate = useNavigate()

    const currentQuestion = useMemo(() => {
        if (!questions || !questions.items || questions.items.length === 0)
            return { title: '' }

        return questions.items[questions.current]
    }, [questions])

    const maisVotado = getMaisVotado(currentQuestion, users)

    const Animation = useMemo(() => {
        // eslint-disable-next-line react-hooks/purity
        return ANIMATIONS[Math.floor(Math.random() * ANIMATIONS.length)]
    }, [])

    const next = useCallback(() => {

        if (questions.current >= questions.items.length - 1) return

        questionsRepo.update('current', questions.current + 1)
        navigate('/admin')

    }, [questions, questionsRepo, navigate])

    const prev = useCallback(() => {

        if (questions.current === 0) return

        questionsRepo.update('current', questions.current - 1)
        navigate('/admin')
    }, [questions, questionsRepo, navigate])

    const reset = useCallback(() => {

        console.log(questions)

        questionsRepo.update('items', questions.items.reduce((acc, curr, idx) => ({
            ...acc,
            [idx]: { ...curr, votes: {} }
        }), {}))

        questionsRepo.update('current', 0)

        navigate('/admin')
    }, [questions, questionsRepo, navigate])

    const handleKeyDown = useCallback((e) => {

        if (e.key === 'ArrowRight') {
            next()
        } else if (e.key === 'ArrowLeft') {
            prev()
        } else if (e.key === 'r' || e.key === 'R') {
            reset()
        }

    }, [next, prev, reset])

    useEffect(() => {

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }

    }, [handleKeyDown])

    return (
        <div>
            <Animation currentQuestion={currentQuestion} maisVotado={maisVotado} users={users} />
        </div>
    )
}

export default Result