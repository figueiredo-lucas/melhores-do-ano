import './porta-moeda.css'

const Moeda = ({ tipo, delay, pessoa }) => {

    const ringType = tipo === 'certa' ? 'ring-[#cfc09f]' : 'ring-primary'

    return (
        <div className={`avatar moeda moeda-${tipo}`} style={{ animationDelay: delay }}>

            <div className={`ring-4 ring-offset-0 ${ringType} rounded-full`}>
                <img src={`images/${pessoa}/0.png`} />
            </div>

        </div>
    )
}

export default Moeda