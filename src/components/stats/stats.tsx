import { StatsType } from "@/model/stats"
import { useEffect, useState } from "react"

type StatsPropsType = {
    statsProps: StatsType[]
}

export const Stats = ({ statsProps }: StatsPropsType) => {

    const [stats, setStats] = useState<StatsType[]>([])

    useEffect(() => {
        setStats(statsProps)
        console.log(statsProps)
    }, [statsProps])

    return (
        <>
            <div className="statsContainer">
                {stats.length > 0 ?
                    stats.map((stat, index) => (
                        <div className="stat" key={index}>
                            <div className="statLabelContainer">
                                <span>{stat.stat.name}</span>
                            </div>
                            <div className="statProgressBarContainer">
                                <span className="statValue">{stat.base_stat}</span>
                                <div className="progressBar" style={{maxWidth: stat.base_stat/2 + "%"}}></div>
                            </div>
                        </div>
                    ))
                    : null}
            </div>
        </>
    )
}