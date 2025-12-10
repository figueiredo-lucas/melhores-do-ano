import { useRepo } from "../hooks/useRepo"
import { useMemo, useEffect, useState } from "react"
import cn from 'clsx'

const Admin = () => {

    console.log('admin rerender')

    const questionsRepo = useRepo('questions')
    const usersRepo = useRepo('users')

    const [questions, setQuestions] = useState({})
    const [users, setUsers] = useState({})

    const activeUsers = useMemo(() => {
        if (!users) return []

        return Object.values(users)
            .filter(user => user.active)
    }, [users])

    const currentQuestion = useMemo(() => {
        if (!questions || !questions.items || questions.items.length === 0)
            return { title: 'Parece que não tem votação hoje' }

        return questions.items[questions.current]
    }, [questions])

    useEffect(() => {

        const unsubscribe = questionsRepo.listen(setQuestions)
        const unsubscribeUsers = usersRepo.listen(setUsers)

        return () => {
            unsubscribe()
            unsubscribeUsers()
        }

    }, [questionsRepo, usersRepo])

    const next = () => {

        if (questions.current >= questions.items.length - 1) return

        questionsRepo.update('current', questions.current + 1)
    }

    const prev = () => {

        if (questions.current === 0) return

        questionsRepo.update('current', questions.current - 1)
    }

    const reset = () => {

        questionsRepo.update('current', 0)
        questionsRepo.update('items', questions.items.reduce((acc, curr, idx) => ({
            ...acc,
            [idx]: { ...curr, votes: {} }
        }), {}))
    }

    return (
        <div className="m-auto w-3/4 h-screen flex flex-col justify-center items-center gap-12">
            <div className="text-center">
                <h1 className="text-7xl uppercase golden-text" data-heading={currentQuestion?.title}>
                    {currentQuestion?.title}
                </h1>
            </div>
            <p className="text-3xl leading-12 tracking-wide uppercase">{currentQuestion?.desc}</p>
            <div className="flex gap-4">
                <button className="btn btn-primary" onClick={prev} disabled={questions.current === 0}>Anterior</button>
                <button className="btn btn-primary" onClick={next} disabled={
                    questions.current >= questions.items?.length - 1
                    // || Object.values(currentQuestion.votes || {}).filter(Boolean).length < activeUsers.length
                }>
                    Próxima</button>
                <button className="btn btn-primary" onClick={reset} >Reiniciar</button>
            </div>

            <div className="fixed flex gap-4 bottom-4 right-4">
                {activeUsers.map((u, idx) => (
                    <div className="avatar animate-bounce" style={{ animationDelay: `${idx * 100}ms` }} key={u.name}>
                        <div className={cn("w-24 rounded-full ring-4 ring-offset-2", {
                            'ring-success': !!currentQuestion.votes?.[u.name],
                            'ring-neutral': !currentQuestion.votes?.[u.name]
                        })}>
                            <img src={`images/${u.imgUrl}/0.png`} />
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Admin