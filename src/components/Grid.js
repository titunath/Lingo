import React from 'react'
import Row from './Row'
export default function Grid({ guesses, currentguess, turn }) {
    return (
        <div>
            {
                guesses.map((g, i) => {
                    if (turn === i) {
                        return <Row key={i} currentguess={currentguess} />
                    }
                    return <Row key={i} guess={g} />
                })
            }
        </div>
    )
}
