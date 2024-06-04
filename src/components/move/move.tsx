import { MovesType } from "@/model/moves"
import { useEffect } from "react"

type MovesPropsType = {
    movesProps: MovesType[]
}

export const Move = ({ movesProps }: MovesPropsType) => {


    return (
        <>
            <div className="moveContainer">
                {movesProps.length > 0 ?
                    movesProps.map((move, index) => (
                        <div className="move" key={index}>
                            <span>{move.move.name}</span>
                        </div>
                    ))
                    : null}
            </div>
        </>
    )
}