import React from "react"

export default function Dice(props) {
    const styles={
        backgroundColor: props.isHeld ? "#59E391" :"florawhite" 
    }
    return(
        <div
         className="dice-display" 
         onClick={props.holdDice}
         style={styles}>
          <h2 className="dice-num">{props.value}</h2>
        </div>
    )
}