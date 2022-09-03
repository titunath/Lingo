import React from 'react'

export default function Modal({ isCorrect, solution, turn }) {
    return (
        <div className="modal">
            {isCorrect && turn===6 && (
                <div>
                    <h1>You Win!</h1>
                    <p className="solution">{solution}</p>
                        <p>Good! You found the solution in {turn} guesses :)</p>
                </div>
            )}
            {isCorrect && turn===5 && (
                <div>
                    <h1>You Win!</h1>
                    <p className="solution">{solution}</p>
                        <p>Nice! You found the solution in {turn} guesses :)</p>
                </div>
            )}
            {isCorrect && turn===4 && (
                <div>
                    <h1>You Win!</h1>
                    <p className="solution">{solution}</p>
                        <p>Awesome! You found the solution in {turn} guesses :)</p>
                </div>
            )}
            {isCorrect && turn===3 && (
                <div>
                    <h1>You Win!</h1>
                    <p className="solution">{solution}</p>
                        <p>Excellent! You found the solution in {turn} guesses :)</p>
                </div>
            )}
            {isCorrect && turn===2 && (
                <div>
                    <h1>You Win!</h1>
                    <p className="solution">{solution}</p>
                        <p>Splendid! You found the solution in {turn} guesses :)</p>
                </div>
            )}
            {isCorrect && turn===1 && (
                <div>
                    <h1>You Win!</h1>
                    <p className="solution">{solution}</p>
                        <p>You guessed it in 1st turn? Did you cheated? :)</p>
                </div>
            )}
            {!isCorrect && (
                <div>
                    <h1>Nevermind</h1>
                    <p className="solution">{solution}</p>
                    <p>Better luck next time :)</p>
                </div>
            )}
        </div>
    )
}