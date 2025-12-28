import { useRepo } from "../hooks/useRepo"
import { useMemo, useEffect, useState } from "react"
import cn from 'clsx'
import { useRef } from "react"
import { useNavigate } from "react-router"

const Admin = () => {

    const questionsRepo = useRepo('questions')
    const usersRepo = useRepo('users')

    const [questions, setQuestions] = useState({})
    const [users, setUsers] = useState({})

    const navigate = useNavigate()

    const modalRef = useRef(null)

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

    const allVoted = useMemo(() => {
        if (!currentQuestion.votes) return false

        console.log('VOTOU', currentQuestion.votes)

        const votedUsers = Object.values(currentQuestion.votes).filter(Boolean)

        return votedUsers.length >= activeUsers.length

    }, [currentQuestion, activeUsers])

    useEffect(() => {

        const unsubscribe = questionsRepo.listen(setQuestions)
        const unsubscribeUsers = usersRepo.listen(setUsers)

        return () => {
            unsubscribe()
            unsubscribeUsers()
        }

    }, [questionsRepo, usersRepo])

    useEffect(() => {

        if (!allVoted) return

        modalRef.current.showModal()

        const idx = Math.floor(Math.random() * 13)

        const player = new Audio(`/audio/reveal/${idx}.mp3`)

        const onEnd = () => {
            modalRef.current.close()

            navigate('/result')
        }

        player.addEventListener('ended', onEnd)

        player.play()

        return () => {
            player.removeEventListener('ended', onEnd)
        }

    }, [allVoted, navigate])

    return (
        <>
            {allVoted && <dialog id="my_modal_1" ref={modalRef} className="modal backdrop-blur-xs">
                <div className="modal-box text-center pt-8 bg-accent text-accent-content">
                    <span className="loading loading-ring loading-xl w-24"></span>
                    <p className="py-4 text-4xl">Calculando as atrocidades que vocês cometeram...</p>
                </div>
            </dialog>}
            <div className="m-auto w-3/4 h-screen flex flex-col justify-center items-center gap-12">
                <div className="text-center">
                    <h1 className="text-7xl uppercase golden-text" data-heading={currentQuestion?.title}>
                        {currentQuestion?.title}
                    </h1>
                </div>
                <p className="text-3xl leading-12 tracking-wide uppercase">{currentQuestion?.desc}</p>
                {/* <div className="flex gap-4">
                    <button className="btn btn-primary" onClick={prev} disabled={questions.current === 0}>Anterior</button>
                    <button className="btn btn-primary" onClick={next} disabled={
                        questions.current >= questions.items?.length - 1
                        // || Object.values(currentQuestion.votes || {}).filter(Boolean).length < activeUsers.length
                    }>
                        Próxima</button>
                    <button className="btn btn-primary" onClick={reset} >Reiniciar</button>
                </div> */}

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
        </>
    )
}

export default Admin