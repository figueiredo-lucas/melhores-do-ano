import './cofre.css'
import PortaMoeda from './PortaMoeda/PortaMoeda'

const Cofre = ({ currentQuestion, maisVotado, users }) => {
    return (
        <>
            <PortaMoeda currentQuestion={currentQuestion} maisVotado={maisVotado} users={users} />
            <div className="quadrado">
                <div className="topo">
                    <div className="topo-cima"></div>
                    <div className="topo-baixo"></div>
                </div>
                <div className="frente"></div>
                <div className="lateral">
                    <div className="lateral-cima"></div>
                    <div className="lateral-baixo"></div>
                </div>
            </div>
        </>
    )
}

export default Cofre