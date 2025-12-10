import './porta-moeda.css'

const PortaMoeda = ({ currentQuestion }) => {
    return (
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
    )
}

export default PortaMoeda