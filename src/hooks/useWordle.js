import { useState } from "react"

const useWordle = (solution) => {
    //on which turn the user is at start he will be on 0th guess
    const [turn, setTurn] = useState(0);
    //what is the current guess which is empty at the begining
    const [currentguess, setcurrentguess] = useState('');
    // we will store each guess in an array
    const [guesses, setGuesses] = useState([...Array(6)]);
    //we will store the previous guesses in a string format
    const [history, setHistory] = useState([]);
    //terminate if the guess is right and it will be false at start
    const [iscorrect, setisCorrect] = useState(false);
    //coloring and making keypad 
    const [usedKeys, setUsedKeys] = useState({})
    //we will format a guess into an array of object of letters
    const formatguess = () => {
        let solutionarray = [...solution];
        let formattedarray = [...currentguess].map((l) => {
            return {
                key: l,
                color: 'grey'
            }
        })
        formattedarray.forEach((l, i) => {
            if (solution[i] === l.key) {
                formattedarray[i].color = 'green';
                solutionarray[i] = null;
            }
        })
        formattedarray.forEach((l, i) => {
            if (solutionarray.includes(l.key) && l.color !== 'green') {
                formattedarray[i].color = 'yellow';
                solutionarray[solutionarray.indexOf(l.key)] = null;
            }
        })
        return formattedarray;
    }

    //we will add a new guess here
    const addguess = (formatguess) => {
        if (currentguess === solution) {
            setisCorrect(true);
        }
        setGuesses(previousguesses => {
            let newguess = [...previousguesses];
            newguess[turn] = formatguess;
            return newguess;
        })
        setHistory(prevhistory => {
            return [...prevhistory, currentguess];
        })
        setTurn(prevturn => {
            return prevturn += 1;
        })
        setUsedKeys(prevUsedKeys => {
            formatguess.forEach(l => 
                {
                const currentColor = prevUsedKeys[l.key]
                if (l.color === 'grey' && currentColor !== ('green' || 'yellow')) {
                    prevUsedKeys[l.key] = 'grey'
                    return
                }
                if (l.color === 'yellow' && currentColor !== 'green') {
                    prevUsedKeys[l.key] = 'yellow'
                    return
                }
                if (l.color === 'green') {
                    prevUsedKeys[l.key] = 'green'
                    return
                }
                
            })

            return prevUsedKeys
        })
        setcurrentguess('')
    }

    //we will handle the keyup events here
    const handleKeyup = ({ key }) => {

        if (key === 'Enter') {
            if (turn > 5) {
                console.log('You have exhausted all your turns');
                return;
            }
            if (currentguess.length !== 5) {
                console.log('You should enter a 5 letter word');
                return;
            }
            if (history.includes(currentguess)) {
                console.log('You have already tried this word');
                return;
            }
            const formatted = formatguess();
            addguess(formatted);
        }

        if (key === 'Backspace') {
            setcurrentguess(prev => prev.slice(0, -1));
            return;
        }

        if (/^[A-Za-z]$/.test(key)) {
            if (currentguess.length < 5) {
                setcurrentguess(prev => prev + key)
            }
        }
    }
    return { turn, currentguess, guesses, iscorrect, usedKeys ,handleKeyup };
}

export default useWordle