import './porta-moeda.css'
import cn from 'clsx'

const Moeda = ({ tipo, delay, url, maisVotado }) => {

    const finalUrl = url ? [url] : (Array.isArray(maisVotado)
        ? maisVotado.map(item => item.imgUrl) : [maisVotado?.imgUrl].filter(Boolean))

    const ringType = tipo === 'certa' ? 'ring-[#cfc09f]' : 'ring-primary'

    return (
        <div className={`avatar moeda moeda-${tipo}`} style={{ animationDelay: `${delay}ms` }}>

            <div className={`ring-4 ring-offset-0 ${ringType} rounded-full flex`}>
                {finalUrl.map(u =>
                    <div className={cn("overflow-hidden w-full", { 'w-1/2': finalUrl.length > 1 })} key={u}>
                        <img src={`images/${u}0.png`} />
                    </div>
                )}
            </div>

        </div>
    )
}

export default Moeda