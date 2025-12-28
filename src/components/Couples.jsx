import cn from 'clsx'
import { useDataListener } from "../hooks/useDataListener"

const Couples = ({ users, couples, selectedVote, vote }) => {

    const external = useDataListener('external')

    console.log(users, external, couples)

    return (
        <div className="flex w-full px-6 flex-1 items-center">
            <div className="gap-8 w-full flex flex-col">
                {Object.values(couples || {}).map((couple) => {

                    const ppl = Object.keys(couple)

                    const voteName = ppl.join('|')

                    const u1 = external[ppl[0]] || users[ppl[0]] || {}
                    const u2 = external[ppl[1]] || users[ppl[1]] || {}

                    return (
                        <div className={cn("w-full py-3")}>
                            <div key={voteName}
                                className={cn("badge badge-lg w-full flex justify-between", {
                                    'badge-primary': selectedVote !== voteName,
                                    'badge-accent': selectedVote === voteName,
                                })}
                                onClick={() => vote(voteName)}>

                                <div className="avatar">
                                    <div className={cn("w-16 rounded-full ring-2 ring-offset-2", {
                                        'ring-primary': selectedVote !== voteName,
                                        'ring-accent': selectedVote === voteName
                                    })}>
                                        <img src={`images/${u1.imgUrl}/0.png`} />
                                    </div>
                                </div>
                                <span>
                                    {ppl.map(p => (external[p]?.nickname || users[p]?.nickname || p)).join(' & ')}
                                </span>
                                <div className="avatar">
                                    <div className={cn("w-16 rounded-full ring-2 ring-offset-2", {
                                        'ring-primary': selectedVote !== voteName,
                                        'ring-accent': selectedVote === voteName
                                    })}>
                                        <img src={`images/${u2.imgUrl}/0.png`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Couples