import { useEffect, useState } from 'react'
import './Games.css'

const N = 4

export default function Games() {

    const [grid, setGrid] = useState(new Array(N * N).fill(null))
    const [turn, setTurn] = useState('X')
    const winner = getWinner()
  
    function getWinner() {
  
      const lines = []
  
      for (let r = 0; r < N; r++) {
        let row = []
        let col = []
        for (let c = 0; c < N; c++) {
            row.push(r * N + c)
            col.push(N * c + r)
        }
        lines.push(row)
        lines.push(col)
      }
  
      let dig1 = []
      let dig2 = []
  
      for(let ind = 0; ind < N; ind++) {
        dig1.push(ind * N + ind)
        dig2.push(ind * N + N - 1 - ind)
      }
      lines.push(dig1)
      lines.push(dig2)
  
      
      for (const line of lines) {
        const [ first, ...other ] = line
        if(grid[first] && other.every((ind) => grid[ind] === grid[first]))
            return grid[first]
      }
  
      return null
    }
  
    function fillCell(index) {
      const updatedGrid = [...grid];
      updatedGrid[index] = turn;
      setGrid(updatedGrid)
      setTurn((prev) => prev === 'X' ? 'O' : 'X')
    }
  
    return (
      <div>
        { winner ? 'winner is: ' + winner : 'Next Player: ' + turn}
        <div style={{ gridTemplateColumns: `repeat(${N}, 30px)`, gridTemplateRows: `repeat(${N}, 30px)` }} className='game-container'>
          {
            grid.map((data, ind) => {
              return (
                <div style={{ cursor: `pointer`, pointerEvents: data || winner ? 'none' : '' }} onClick={() => fillCell(ind)} className='game-cell'>{data}</div>
              )
            })
          }
        </div>
  
      </div>
  
    );
  
}