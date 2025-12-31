import { useEffect, useRef } from 'react'
import './cartas.css'

const Cartas = ({ currentQuestion, maisVotado, users }) => {

    const cartasRef = useRef(null)

    // não adicione mais pessoas AAAAAAAAAAAA
    const TRANSLATES = [10, -30, -65, -95, -120, -135, -135, -120, -95, -65, -30, 10]

    const _getStyle = (idx) => {
        const total = Object.values(users).length
        const middle = (total - 1) / 2
        const offset = (idx - middle) * -1
        const rotateZ = offset * 5
        const translateY = TRANSLATES[idx];

        return {
            transform: `rotateY(180deg) rotateZ(${rotateZ}deg) translateY(${translateY}px)`,
        }
    }

    useEffect(() => {

        if (!cartasRef.current) return

        if (maisVotado?.length > 1) {

            maisVotado.forEach(mv => {

                setTimeout(() => {
                    let carta = cartasRef.current.querySelector(`#${mv.name}`)

                    if (!carta) {
                        console.log(cartasRef.current.childNodes[0])
                        carta = cartasRef.current.childNodes[0].cloneNode(true)
                        carta.id = mv.name
                        carta.childNodes[0].innerText = mv.nickname
                        console.log(mv)
                        carta.childNodes[1].childNodes[0].childNodes[0].src = `images/${mv.imgUrl}/0.png`
                        cartasRef.current.appendChild(carta)
                        carta.classList.add('opacity-0')
                        setTimeout(() => {
                            carta.classList.add('opacity-100')
                        }, 500)
                    }

                    carta.classList.add('selected')

                }, 5500)
            })

        } else if (maisVotado?.name) {
            setTimeout(() => {
                let carta = cartasRef.current.querySelector(`#${maisVotado.name}`)

                if (!carta) {
                    console.log(cartasRef.current.childNodes[0])
                    carta = cartasRef.current.childNodes[0].cloneNode(true)
                    carta.id = maisVotado.name
                    carta.childNodes[0].innerText = maisVotado.nickname
                    carta.childNodes[1].childNodes[0].childNodes[0].src = `images/${maisVotado.imgUrl}/0.png`
                    cartasRef.current.appendChild(carta)
                }
                carta.classList.add('selected')
            }, 5500)
        }

    }, [maisVotado])

    return (
        <div className="h-screen pt-12">

            <div className="flex justify-center">
                <h1 className="text-7xl uppercase golden-text" data-heading={currentQuestion?.title}>
                    {currentQuestion?.title}
                </h1>
            </div>

            <div className="cartas" ref={cartasRef}>
                {Object.values(users).map((user, idx) => {
                    return (
                        <div className="carta" id={user.name} key={idx} style={_getStyle(idx)}>
                            <span>{user.nickname}</span>
                            <div className="avatar">
                                <div className={`ring-0 w-32 ring-offset-0 rounded-full`}>
                                    <img src={`images/${user.imgUrl}/0.png`} />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Cartas