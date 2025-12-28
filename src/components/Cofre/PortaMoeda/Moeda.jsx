import './porta-moeda.css'

const Moeda = ({ tipo, delay, url }) => {

    const ringType = tipo === 'certa' ? 'ring-[#cfc09f]' : 'ring-primary'

    return (
        <div className={`avatar moeda moeda-${tipo}`} style={{ animationDelay: `${delay}ms` }}>

            <div className={`ring-4 ring-offset-0 ${ringType} rounded-full`}>
                <img src={`images/${url}/0.png`} />
            </div>

        </div>
    )
}

export default Moeda