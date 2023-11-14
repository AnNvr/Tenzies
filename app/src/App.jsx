import React, {useEffect, useState} from "react"
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import Die from "./Die"

export default function App() {
  /* state here */
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [rollCount, setRollCount] = useState(0)
  const [timer, setTimer] = useState(0)
  const [timerCollection, setTimerCollection] = useState([])
  const [bestTime, setBestTime] = useState(
    parseInt(localStorage.getItem("bestTime"), 10) || null
  );
  
  /* effects here */
  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const arbitraryValue = dice[0].value
    const allSameValue = dice.every(die => die.value === arbitraryValue)
  
    if (allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [dice])
  
  useEffect(() => {
    let interval
  
    if(tenzies) {
      clearInterval(interval)
    } else {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1)
      }, 1000)
    }
  
    return () => clearInterval(interval) 
  }, [tenzies])
  
  useEffect(() => {
    if (tenzies) {
      // Game won, update timerCollection
      setTimerCollection((prevTimer) => [...prevTimer, timer]);
      // Update best time
      const minTime = Math.min(...timerCollection, timer);
      setBestTime(minTime);
      // Store in localStorage
      localStorage.setItem("bestTime", minTime.toString());
    }
  }, [tenzies, timer, timerCollection])
  
  
    /* functionalities here */
    function allNewDice() {
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
        setRollCount(prevCount => prevCount + 1)
      } else {
        setTenzies(false)
        setDice(allNewDice())
        setRollCount(0)
        setTimer(0)
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
        <p className="rolls">Rolls: {rollCount}</p>
        <p className="time">Time: {timer} seconds</p>
        <p className="best-time">Best Time: {bestTime || "N/A"} seconds</p>      
        <div className="container">{diceElements}</div>
        <button onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
      </main>
    )
  }