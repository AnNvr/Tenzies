import React, {useEffect, useState} from "react"
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import Die from "./Die"


function App() {
/* state here */
const [dice, setDice] = useState(allNewDices())
const [tenzies, setTenzies] = useState(false)

/* effects here */
useEffect(() => {
  const allHeld = dice.every(die => die.isHeld)
  const arbitraryValue = dice[0].value
  const allSameValue = dice.every(die => die.value === arbitraryValue)

  if (allHeld && allSameValue) {setTenzies(true) }
}, [dice])

  /* functionalities here */
  function allNewDices() {
    const diceArray = []
    for (let i = 0; i < 10; i++) {
      diceArray.push({
        id: nanoid(),
        value: Math.ceil(Math.random() * 6),
        isHeld: false
      })
    }
    return diceArray
  }

  function rollDice() {
    if (!tenzies) {
      setDice(prevState => prevState.map(item => {
        if (!item.isHeld) {
          return {...item, value: Math.ceil(Math.random() * 6)}
        }
        return item
      }))
    } else {
      setTenzies(false)
      setDice(allNewDices())
    }
  }

  function holdDice(id) {
    setDice(prevState => prevState.map(item => {
        if (item.id === id) {
            return {...item, isHeld: !item.isHeld}
        }
        return item
      })
    )
  }

  const diceElements = dice.map(item => (
    <Die
      key={item.id}
      value={item.value}
      isHeld={item.isHeld}
      holdDice={() => holdDice(item.id)}
      />))

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. 
      Click each die to freeze it at its current value between rolls.</p>      
      <div className="container">
      {diceElements}
      </div>
      <button onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}

export default App
