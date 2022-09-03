import React, { useEffect, useState } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid';
import Keypad from './Keypad';
import Modal from './Modal';
export default function Wordle({ solution }) {
    const { currentguess, guesses, turn, iscorrect, usedKeys, handleKeyup } = useWordle(solution);
    const [showModal, setShowModal] = useState(false)
    useEffect(() => {
        window.addEventListener("keyup", handleKeyup);
        return () => {
            window.removeEventListener("keyup", handleKeyup);
        }
    }, [handleKeyup])

    if (iscorrect) {
        setTimeout(() => setShowModal(true), 2000)
        //console.log('congrats, you win')
        window.removeEventListener('keyup', handleKeyup)
    }
    if (turn > 5) {
        setTimeout(() => setShowModal(true), 2000)
        //console.log('unlucky, out of guesses')
        window.removeEventListener('keyup', handleKeyup)
    }

    useEffect(() => {
        console.log(guesses, turn, iscorrect)
    }, [guesses, turn, iscorrect])

    return (
        <div>
            {/* <div>{solution}</div> */}
            {/* <div>current guess- {currentguess}</div> */}
            <Grid guesses={guesses} currentguess={currentguess} turn={turn} />
            <Keypad usedKeys={usedKeys} />
            {showModal && <Modal isCorrect={iscorrect} turn={turn} solution={solution} />}
        </div>
    )
}
