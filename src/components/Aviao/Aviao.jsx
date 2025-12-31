import { useEffect, useState } from 'react'
import cn from 'clsx'
import './aviao.css'

const Aviao = ({ currentQuestion, maisVotado }) => {

    const [showExplosion, setShowExplosion] = useState(false)

    const finalUrl = (Array.isArray(maisVotado)
        ? maisVotado.map(item => item.imgUrl) : [maisVotado?.imgUrl].filter(Boolean))

    useEffect(() => {

        setTimeout(() => {

            const player = new Audio('audio/aviao.mp3')
            player.currentTime = 8
            player.play()

        }, 200)

        setTimeout(() => {
            setShowExplosion(true)

            const player2 = new Audio('audio/explosao.mp3')
            player2.volume = 0.5
            player2.play()

            setTimeout(() => {
                setShowExplosion(false)
            }, 1000)

        }, 3000)

    }, [])



    return (
        <div className="envolucro">

            <div className="flex justify-center py-8">
                <h1 className="text-7xl uppercase golden-text h-18" data-heading={currentQuestion?.title}>
                    {currentQuestion?.title}
                </h1>
            </div>

            {showExplosion && <div className="explosao"></div>}
            <div className="predios">
                <div className="predio"></div>
                <div className="predio"></div>
            </div>
            <div className="chao"></div>
            <div className="mar"></div>

            <div className="aviao">

                <div className="asa-direita"></div>
                <div className="miolo">
                    <div className="avatar anel">

                        <div className="ring-4 w-38 ring-offset-0 rounded-full">
                        </div>

                    </div>
                </div>

                <div className="asa-esquerda"></div>

            </div>

            <div className="avatar anel vencedor">

                <div className={`ring-4 ring-offset-0 rounded-full flex`}>
                    {finalUrl.map(u =>
                        <div className={cn("overflow-hidden", { 'w-1/2': finalUrl.length > 1 })} key={u}>
                            <img src={`images/${u}0.png`} />
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default Aviao