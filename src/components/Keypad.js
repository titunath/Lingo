import React, { useEffect, useState } from 'react'

export default function Keypad({ usedKeys }) {
    const [letters, setLetters] = useState(null)

    useEffect(() => {
        fetch('https://api.npoint.io/5e26cb63699c4aa9ae3f')
            .then(res => res.json())
            .then(json => {
                setLetters(json)
            })
    }, [])

    return (
        <div className="keypad">
            {letters && letters.map(l => {
                const color = usedKeys[l.key]
                return (
                    <div key={l.key} className={color}>{l.key}</div>
                )
            })}
        </div>
    )
}