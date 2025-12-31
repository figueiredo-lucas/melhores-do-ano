import { useEffect } from "react"
import { useCallback } from "react"
import { useNavigate } from "react-router"

const Initial = () => {

    const navigate = useNavigate()

    const init = useCallback(() => {

        const player = new Audio('audio/grandefamilia.ogg')
        player.playbackRate = 2
        player.play()

        const onEnd = () => {
            navigate('/admin')
        }

        player.addEventListener('ended', onEnd)

        player.play()

        return () => {
            player.removeEventListener('ended', onEnd)
        }

    }, [navigate])

    const handleKeyDown = useCallback((e) => {

        if (e.key === 'Enter')
            return init()

    }, [init])

    useEffect(() => {

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }

    }, [handleKeyDown])


    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <img src="images/melhoresdoanologo.png" alt="Melhores do Ano Logo"
                style={{ width: '50vh', filter: 'drop-shadow(2px 4px 6px black)' }} />
            <img src="images/qrc.svg" alt="QRCode"
                style={{ width: '30vh', border: '2px solid #9231b8', background: '#9231b8', borderRadius: '16px' }} />
        </div>
    )
}

export default Initial