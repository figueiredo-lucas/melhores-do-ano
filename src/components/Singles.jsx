import cn from 'clsx'

const Singles = ({ userName, users, selectedVote, vote }) => {
    return (
        <div className="flex w-full px-6 flex-1 items-center">
            <div className="gap-8 w-full grid grid-cols-2">
                {Object.values(users || {}).filter(u => u.name !== userName).map((u, idx) => {
                    return (
                        <div className={cn("w-full py-3", { 'text-right': idx % 2 === 1 })}>
                            <div key={u.name}
                                className={cn("badge badge-lg", {
                                    'badge-primary': selectedVote !== u.name,
                                    'badge-accent': selectedVote === u.name,
                                })}
                                onClick={() => vote(u.name)}>

                                {idx % 2 !== 0 && <span>{u.nickname}</span>}
                                <div className="avatar">
                                    <div className={cn("w-16 rounded-full ring-2 ring-offset-2", {
                                        'ring-primary': selectedVote !== u.name,
                                        'ring-accent': selectedVote === u.name
                                    })}>
                                        <img src={`images/${u.imgUrl}/0.png`} />
                                    </div>
                                </div>
                                {idx % 2 === 0 && <span>{u.nickname}</span>}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Singles