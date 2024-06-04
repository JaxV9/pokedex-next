import { StatsType } from "@/model/stats"
import { useEffect, useState } from "react"

type StatsPropsType = {
    statsProps: StatsType[],
    currentColorProps: string | undefined
}

export const Stats = ({ statsProps, currentColorProps }: StatsPropsType) => {


    return (
        <>
            <div className="statsContainer">
                {statsProps.length > 0 ?
                    statsProps.map((stat, index) => (
                        <div className="stat" key={index}>
                            <div className="statLabelContainer">
                                <span>{stat.stat.name}</span>
                            </div>
                            <div className="statProgressBarContainer">
                                <span className="statValue">{stat.base_stat}</span>
                                <div className="progressBar" style={{maxWidth: stat.base_stat/2 + "%", backgroundColor: currentColorProps}}></div>
                            </div>
                        </div>
                    ))
                    : null}
            </div>
        </>
    )
}