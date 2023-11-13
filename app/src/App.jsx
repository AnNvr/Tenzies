import React, {useState} from "react"
import Die from "./Die"

function App() {
/* state here */
const [dice, setDice] = useState(allNewDices())

  /* functionalities here */
  function allNewDices() {
    return Array.from({ length: 10 }, (_, index) => ({
      index,
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    }))
  }

  function handleClick() {
    setDice(allNewDices())
  }

  const diceElements = dice.map(item => (
    <Die
      key={item.index}
      value={item.value}
      isHeld={item.isHeld}
      />))

  return (
    <main>
      <div className="container">
      {diceElements}
      </div>
      <button onClick={handleClick}>Roll</button>
    </main>
  )
}

export default App
