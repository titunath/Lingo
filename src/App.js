import React, { useEffect, useState, createContext } from 'react';
import Wordle from './components/Wordle';
import ReactSwitch from "react-switch";
export const ThemeContext = createContext(null);
function App() {

  const [modalOpen, setModalOpen] = useState(false);

  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  const [solution, setSolution] = useState(null);
  const getDayOfTheYear = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    return day;
  };
  useEffect(() => {
    fetch('https://api.npoint.io/542eb78581babb21b9f3')
      .then(res => res.json())
      .then(json => {
        //we will pick up a random solution
        const randomsolution = json[getDayOfTheYear()];
        //setting the randome solution 
        setSolution(randomsolution.word);
      })
  }, [setSolution]
  )
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="toggle" id={theme}>
        {modalOpen && <div className="modalBackground">
          <div className="modalContainer">
            <div className="titleCloseBtn">
              <button onClick={() => { setModalOpen(false); }}>
                <span>
                  ✖
                </span>
              </button>
            </div>
            <img src={theme === "dark" ? 'https://i.ibb.co/wLrpZKS/helpb.png' : 'https://i.ibb.co/tXzr3RG/helpw.png'} id='imag' />
          </div>
        </div>
        }
        <nav>
          <img src={theme === "dark" ? `https://i.ibb.co/zn8Tb8r/img.png` : `https://i.ibb.co/1v2CLtd/imgd.png`} onClick={() => { setModalOpen(true); }} />
          <h1>Wordle</h1>
          <div className="switch">
            <span>☀️</span>
            <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} height={20} width={34} />
            <span>🌒</span>
          </div>
        </nav>
        <hr style={theme === "light" ? { color: '#000000', height: 1, backgroundColor: '#000000' } :
          { color: '#ffffff', height: .8, backgroundColor: '#ffffff', }} />
        {solution && !modalOpen && <Wordle solution={solution} />}
      </div>
    </ThemeContext.Provider>
  );
}

export default App

/* 
data we need to track:
  -- solution
    -- 5 letter string, e.g. 'drain'
  -- past guesses
    -- an array of past guesses
    -- each past guess is an array of letter objects [{}, {}, {}, {}, {}]
    -- each object represents a letter in the guess word {letter: 'a', color: 'yellow'}
  -- current guess
    -- string 'hello'
  -- keypad letters
    -- array of letter objects [{key: 'a', color: 'green'}, {}, {} ...]
  -- number of turns
    -- an integer 0 - 6
game process:
  -- entering words:
    -- user enters a letter & a square is filled with that letter
    -- when a user hits delete it deletes the previous letter
    -- when a user hits enter it submits the word
      -- if all squares are not filled with letters then the word is not submitted
      -- if that word has already been used in a prev guess then the word is not submitted
  -- checking submitted words:
    -- each letter is checked to see if it matches to the solution
    -- each letter is assigned a color based on it's inclusion in the solution
      -- exact matches (correct position in the solution) are green
      -- partial matches (in the solution but not the correct position) are yellow
      -- none-matches (not in the solution at all) are grey
    -- the guess is added the grid with the correct colors
    -- the current guess moves to the next row
    -- the keypad letters are updated (colors)
  -- ending the game:
    -- when the guessed word fully matches the solution
      -- modal to say 'well done'
    -- when the user runs out of guesses
      -- modal to say 'unlucky'
*/