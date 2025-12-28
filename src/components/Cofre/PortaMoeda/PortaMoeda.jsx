
import Moeda from './Moeda'
import './porta-moeda.css'

const PortaMoeda = ({ currentQuestion, maisVotado, users }) => {

    return (
        <div className="porta-moeda">

            <div className="flex justify-center">
                <h1 className="text-7xl uppercase golden-text" data-heading={currentQuestion?.title}>
                    {currentQuestion?.title}
                </h1>
            </div>

            {Object.values(users || {})?.map((user, idx) => {
                return <Moeda key={user.name} tipo={idx % 2 ? 'direita' : 'esquerda'} delay={idx * 500} url={user.imgUrl} />
            })}

            <Moeda tipo="certa" url={maisVotado?.imgUrl} />


        </div>
    )
}

export default PortaMoeda