import { useDataListener } from '../../hooks/useDataListener'

const Creditos = () => {

    const users = useDataListener('users')
    const external = useDataListener('external')


    return (
        <div>
            <div className="px-6 flex-1 flex justify-center">
                {/* <div> */}
                <h1 className="text-6xl uppercase golden-text multiline" data-heading="Obrigado por terem participado">
                    Obrigado por terem participado
                </h1>
                {/* </div> */}
            </div>

            <div className="flex justify-center gap-4 mt-12 mb-24 max-w-screen flex-wrap">
                {[...Object.values(users), ...Object.values(external)].map((u) => (
                    <div className="avatar" key={u.name}>
                        <div className={"w-42 mask mask-heart ring-0 ring-offset-2"}>
                            <img src={`images/${u.imgUrl}/0.png`} />
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Creditos