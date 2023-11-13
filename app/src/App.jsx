import React, {useState} from "react"
import Die from "./Die"
import { nanoid } from 'nanoid'

function App() {
/* state here */
const [dice, setDice] = useState(allNewDices())

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

  function handleClick() {
    setDice(allNewDices())
  }

  const diceElements = dice.map(item => (<Die key={item.id} value={item.value}/>))

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
