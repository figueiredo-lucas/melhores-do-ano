import { useState, useMemo, useEffect, useRef } from 'react'
import { PiHandPeace } from 'react-icons/pi'
import { toast } from 'react-toastify'
import { MdEdit, MdLogout } from 'react-icons/md'
import cn from 'clsx'

import * as store from '../store'
import { useRepo } from '../hooks/useRepo'
import { useDataListener } from '../hooks/useDataListener'
import Singles from '../components/Singles'
import Couples from '../components/Couples'
import { useSimpleAuth } from '../hooks/useSimpleAuth'

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

    const { user, logout } = useSimpleAuth()
    const [editIdx, setEditIdx] = useState(0)
    const [hideEdit, setHideEdit] = useState(false)
    const [removeEdit, setRemoveEdit] = useState(false)
    const [selectedVote, setSelectedVote] = useState(null)
    const [alreadyVoted, setAlreadyVoted] = useState(false)
    const [questions, setQuestions] = useState({})
    const prevQuestion = useRef(null)

    const questionsRepo = useRepo('questions')

    const users = useDataListener('users')
    const couples = useDataListener('couples')

    const joinedCouples = useMemo(() => {

        if (!couples || Object.values(couples).length === 0) return []

        return couples.map(couple => Object.keys(couple).sort().join('|'))

    }, [couples])


    const currentQuestion = useMemo(() => {
        if (!questions || !questions.items || questions.items.length === 0)
            return { title: '' }

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


        if (currentQuestion.excludes) {

            const excluded = currentQuestion.excludes.sort().join('|')

            if (excluded === userName) {

                const people = currentQuestion.couples ? joinedCouples : Object.values(users).map(u => u.name)
                const filtered = people.filter(c => c !== excluded)

                setTimeout(() => {
                    setSelectedVote(filtered[Math.floor(Math.random() * filtered.length)])
                }, 300)
                toast.error('Naum 😊', { autoClose: 300 })

            }

        }

    }

    const confirm = () => {
        if (!selectedVote) return

        let vote = currentQuestion.overrides || selectedVote

        setAlreadyVoted(true)
        questionsRepo.update(`items/${questions.current}/votes/${user.name}`, vote)
        toast.success('Tá votado, agora espera')
    }

    const logoff = () => {
        store.user.set(null)
    }

    useEffect(() => {

        const unsubscribe = questionsRepo.listen(setQuestions)

        return () => {
            unsubscribe()
        }

    }, [questionsRepo])

    useEffect(() => {
        if (prevQuestion.current !== questions.current) {

            // eslint-disable-next-line react-hooks/set-state-in-effect
            setAlreadyVoted(false)
            setSelectedVote(null)
            prevQuestion.current = questions.current

        }
    }, [questions])

    if (!currentQuestion) {

        return (
            <div className="flex flex-col gap-4 items-center h-dvh justify-between">
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
                    <button className="btn btn-sm btn-ghost btn-square absolute right-0 top-0" onClick={logout}>
                        <MdLogout className="text-xl" />
                    </button>
                </div>
                <div className="px-6 flex-1 flex items-center">
                    <div className="text-center">
                        <h1 className="text-3xl uppercase golden-text multiline" data-heading="Não fez mais que sua obrigação!">
                            Não fez mais que sua obrigação!
                        </h1>
                    </div>
                </div>
                <div className="flex-1">
                    <div class="avatar animate-heartbeat">
                        <div class="mask mask-heart w-64">
                            <img src="images/dedao.webp" alt="Tchauzinho" className="w-64 h-64 rounded-lg" />
                        </div>
                    </div>
                </div>


                <div className="flex flex-1 items-center mb-10">
                    <h1 className="text-4xl uppercase golden-text" data-heading="Tchauzinho :)">
                        Tchauzinho :)
                    </h1>
                </div>
            </div>
        )

    }

    return (
        <div className="flex flex-col gap-4 items-center h-dvh">
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
                <button className="btn btn-sm btn-ghost btn-square absolute right-0 top-0" onClick={logout}>
                    <MdLogout className="text-xl" />
                </button>
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

            {currentQuestion.couples
                ? <Couples users={users} couples={couples} selectedVote={selectedVote} vote={vote} />
                : <Singles userName={user?.name} users={users} selectedVote={selectedVote} vote={vote} />}

            <div className="flex items-end w-full p-6">
                <button className="btn btn-neutral btn-block" onClick={confirm} disabled={alreadyVoted || !selectedVote}>
                    (13) CONFIRMA
                </button>
            </div>

        </div >
    )
}

export default Dashboard
