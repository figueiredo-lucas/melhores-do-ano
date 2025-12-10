import { useState, useMemo, useEffect, useRef } from 'react'
import { useWireValue } from '@forminator/react-wire'
import { PiHandPeace } from 'react-icons/pi'
import { toast } from 'react-toastify'
import { MdEdit } from 'react-icons/md'
import cn from 'clsx'

import * as store from '../store'
import { useRepo } from '../hooks/useRepo'

const MSG_EDIT = [
    'Quem disse q pode?',
    'Já falei q não, uai',
    'Pode tentar quanto quiser, lindeza',
    'Tá bom, já q vc insiste, na próxima vai rolar',
    'Mentira, otário',
    'Cansei, tchau',
    'Cansei, tchau',
    'Cansei, tchau',
    'Cansei, tchau',
    'Cansei, tchau',
    'Cansei, tchau',
    'Cansei, tchau',
    'Cansei, tchau',
    'Nossa, vc é insuportavel, te fude',
]


const Dashboard = () => {

    const user = useWireValue(store.user)
    const [editIdx, setEditIdx] = useState(0)
    const [hideEdit, setHideEdit] = useState(false)
    const [removeEdit, setRemoveEdit] = useState(false)
    const [users, setUsers] = useState([])
    const [selectedVote, setSelectedVote] = useState(null)
    const [alreadyVoted, setAlreadyVoted] = useState(false)
    const prevQuestion = useRef(null)

    const usersRepo = useRepo('users')
    const questionsRepo = useRepo('questions')

    const [questions, setQuestions] = useState({})

    const currentQuestion = useMemo(() => {
        if (!questions || !questions.items || questions.items.length === 0)
            return { title: 'Parece que não tem votação hoje' }

        return questions.items[questions.current]
    }, [questions])

    const onEditClick = () => {
        setEditIdx(editIdx + 1)
        toast.warn(MSG_EDIT[editIdx])

        if (editIdx >= MSG_EDIT.length - 1) {
            setEditIdx(0)
            setHideEdit(true)
            setTimeout(() => {
                setRemoveEdit(true)
            }, 1000)
        }
    }

    const vote = (userName) => {

        if (alreadyVoted) return

        setSelectedVote(selectedVote === userName ? null : userName)

    }

    const confirm = () => {
        if (!selectedVote) return

        setAlreadyVoted(true)
        questionsRepo.update(`items/${questions.current}/votes/${user.name}`, selectedVote)
        toast.success('Tá votado, agora espera')
    }

    useEffect(() => {

        const unsubscribe = questionsRepo.listen(setQuestions)
        const unsubscribeUsers = usersRepo.listen(setUsers)

        return () => {
            unsubscribe()
            unsubscribeUsers()
        }

    }, [questionsRepo, usersRepo])

    useEffect(() => {
        if (prevQuestion.current !== questions.current) {

            setAlreadyVoted(false)
            setSelectedVote(null)
            prevQuestion.current = questions.current

        }
    }, [questions.current])

    return (
        <div className="flex flex-col gap-4 items-center h-screen">
            <div className="text-xl flex items-end gap-2 justify-center mb-2">
                <div>
                    <span className="text-sm">Oi, </span>{user?.nickname}
                </div>
                {!removeEdit &&
                    <span className={cn("tooltip tooltip-bottom transition-opacity duration-1000", { 'opacity-0': hideEdit })}
                        data-tip="Trocar de apelido"
                        onClick={onEditClick}>
                        <button className="btn btn-sm btn-ghost btn-square">
                            {hideEdit && <PiHandPeace className="text-xl" />}
                            {!hideEdit && <MdEdit className="text-xl" />}
                        </button>
                    </span>}
            </div>

            <div className="px-6">
                <div className="text-center">
                    <div className="text-sm uppercase text">CATEGORIA</div>
                    <h1 className="text-3xl uppercase golden-text multiline" data-heading={currentQuestion?.title}>
                        {currentQuestion?.title}
                    </h1>
                </div>
                {/* <p className="uppercase mb-2">{currentQuestion?.desc}</p> */}

            </div>

            <div className="flex w-full px-6 flex-1 items-center">
                <div className="gap-4 w-full grid grid-cols-2">
                    {Object.values(users || {}).filter(u => u.name !== user.name).map((u, idx) => {
                        return (
                            <div className={cn("w-full py-3", { 'text-right': idx % 2 === 1 })}>
                                <div key={u.name}
                                    className={cn("badge badge-lg", {
                                        'badge-primary': selectedVote !== u.name,
                                        'badge-accent': selectedVote === u.name,
                                    })}
                                    onClick={() => vote(u.name)}>

                                    {idx % 2 !== 0 && <span>{u.nickname}</span>}
                                    <div className="avatar">
                                        <div className={cn("w-12 rounded-full ring-2 ring-offset-2", {
                                            'ring-primary': selectedVote !== u.name,
                                            'ring-accent': selectedVote === u.name
                                        })}>
                                            <img src={`images/${u.imgUrl}/0.png`} />
                                        </div>
                                    </div>
                                    {idx % 2 === 0 && <span>{u.nickname}</span>}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="flex items-end w-full p-6">
                <button className="btn btn-neutral btn-block" onClick={confirm} disabled={alreadyVoted || !selectedVote}>
                    CONFIRMA
                </button>
            </div>

        </div >
    )
}

export default Dashboard
