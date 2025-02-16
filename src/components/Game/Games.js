import { useEffect, useState } from 'react'
import './Games.css'

const winnerArr = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]

export default function Games() {

    const [elements, setElements] = useState(new Array(9).fill(null))
    const [turn, setTurn] = useState('X')

    useEffect(()=>{
        calculateWinner()
    },[elements])

    

    function fillMatrix(index) {
        console.log(index);
        setElements((elements)=>{
            let val = [...elements]
            val[index] = turn;
            return val;
        })
        setTurn((currentTurn) => currentTurn === 'X' ? 'O' : 'X')
    }

    function calculateWinner() {
        let winner;
        let isDraw = true;
        for (let i = 0; i < winnerArr.length; i++) {
            let position = winnerArr[i]
            let checkForX = true;
            let checkForO = true;
            for (let j = 0; j < position.length; j++) {
                let index = position[j]
                
                if(elements[index] === 'X' || !elements[index]) {
                    checkForO = false
                }
                if(elements[index] === 'O' || !elements[index]) {
                    checkForX = false
                }
                if(!elements[index]) {
                    isDraw = false
                }
            }
            if(checkForO) {
                winner = 'O'
                break
            }
            if(checkForX) {
                winner = 'X'
                break;
            }
        }

        if(winner || isDraw) {
            const temp = winner ? `${winner} is winner` : 'Game is draw';
            alert(temp)
        
            resetGame()
        }
    }

    function resetGame ()  {
        setTurn('X')
        setElements(new Array(9).fill(null))
    }
    //style={{ pointerEvents: val ? 'none' : ''}}

    return (
    <>
        <div className='matrix'>
            {elements.map((val, index) => (
                <div key={index} className='element' onClick={()=>fillMatrix(index)} style={{background: val ? 'red': '', pointerEvents: val ? 'none': '', }}>
                    {val}
                </div>
            ))}
        </div>
    </>
    )
}