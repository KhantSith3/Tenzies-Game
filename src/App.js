import React,{useState} from "react";
import Dice from "./Dice"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

export default function App() {
    const [result,resultchange] = useState(allNewDice())
    const [tenzies,setTenzies] =useState(false)

   React.useEffect(()=>{
    const allHeld = result.every(dice=> dice.isHeld)
    const firstValue =result[0].value
    const allSamevalue =result.every(dice=> firstValue ===dice.value)
    if(allHeld && allSamevalue){
        setTenzies(true)
    }
   },[result])

   function GenerateDice() {
    return{
        value :Math.ceil(Math.random()*6),
        isHeld: false,
        id:nanoid() 
    }
   }

    function allNewDice() {
        const newDice =[]
        for(let i= 0;i<10 ; i++){
            newDice.push(
            {value :Math.ceil(Math.random()*6),
            isHeld: false,
            id:nanoid()
        })
        }
        return newDice
    }
    const handleClick =() =>{
      if(!tenzies){
        resultchange(prev => prev.map(dice =>{
            return dice.isHeld ? dice: GenerateDice()
            
          }))
      }else{
        setTenzies(false)
        resultchange(allNewDice())
      }
    }

    const holdDice =(id) =>{
    resultchange(prev => prev.map(dice=>{
        return dice.id === id ? {...dice,isHeld: !dice.isHeld} : dice
    }))
    }

  const DiceElements =result.map(dice=>
    <Dice 
     key={dice.id}
     value={dice.value}
     isHeld={dice.isHeld}
     id={dice.id}
     holdDice={() =>holdDice(dice.id)}
    />
  )
    return(
        <main>
          {tenzies && <Confetti />}
            <h1>Tenzies</h1>
            <p>Roll until all dice are the same.
            Click each dice to freeze it at its 
            current value between rolls.</p>
            <div className="dice-container">
              {DiceElements}
            </div>
            <button className="roll-dice"
            onClick={handleClick}>{tenzies? "NewGame" :"Roll"}</button>
        </main>
    )
}