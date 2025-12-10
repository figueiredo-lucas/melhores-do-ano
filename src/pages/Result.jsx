import { useMemo } from "react"
import { useEffect } from "react"
import { useRepo } from "../hooks/useRepo"
import { useState } from "react"

const Result = () => {

    const questionsRepo = useRepo('questions')

    const [questions, setQuestions] = useState({})

    const currentQuestion = useMemo(() => {
        if (!questions || !questions.items || questions.items.length === 0)
            return { title: 'Parece que não tem votação hoje' }

        return questions.items[questions.current]
    }, [questions])

    useEffect(() => {

        const unsubscribe = questionsRepo.listen(setQuestions)

        return () => {
            unsubscribe()
        }

    }, [questionsRepo])



    return (
        <div>
            <div className="porta-moeda">

                <div className="flex justify-center">
                    <h1 className="text-7xl uppercase golden-text" data-heading={currentQuestion?.title}>
                        {currentQuestion?.title}
                    </h1>
                </div>

                <div className="moeda"></div>
                <div className="moeda moeda-esquerda"></div>

                <div className="avatar moeda moeda-certa" >
                    <div className="ring-4 ring-offset-0 ring-[#cfc09f] rounded-full">
                        <img src={`images/lucas/0.png`} />
                    </div>
                </div>

            </div>
            <div className="quadrado">
                <div className="topo">
                    <div className="topo-cima"></div>
                    <div className="topo-baixo"></div>
                </div>
                <div className="frente"></div>
                <div className="lateral">
                    <div className="lateral-cima"></div>
                    <div className="lateral-baixo"></div>
                </div>

            </div>

        </div>
    )
}

export default Result