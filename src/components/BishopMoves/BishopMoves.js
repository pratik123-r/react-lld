import React, { useState } from "react";
import './BishopMoves.css';

const boardSize = 8;

export default function BishopMoves() {

    const [ targetCells, setTargetCells ] =  useState([])

    function fillTargetCell (row, col) {
        const tc = [[row, col]]
        const dir = [[1,1], [1, -1], [-1,-1], [-1, 1]]
        for (let index = 0; index < dir.length; index++) {
            let r = row;
            let c = col;
            let [dx, dy]  = dir[index]
            r = r+dx;
            c = c+dy;
            while (r < boardSize && c < boardSize && c >=0 && r >=0) {
                tc.push([r, c])
                r = r+dx;
                c = c+dy
            }
        }
        setTargetCells(tc)        
    }
 
  function handleMouseLeave() {
    setTargetCells([])
  }
  function handleMouseEnter(row, col) {
    fillTargetCell(row, col)
    
  }

  function hasTargetCell(row, col) {
    return targetCells.some(([r,c]) => r===row && c===col)
  }


  return (
    <div className="board">
      {Array.from({ length: boardSize }).map((_, row) =>
        Array.from({ length: boardSize }).map((_, col) => {
          const isLight = (row + col) % 2 === 0;
          return (
            <div
              key={`${row}-${col}`}
              role="gridcell"
              
              onMouseEnter={() => handleMouseEnter(row, col)}
              onMouseLeave={() => handleMouseLeave(row, col)}
              className={`cell ${hasTargetCell(row, col) ? ( row == targetCells[0][0] && col == targetCells[0][1] ? 'hovered' : 'bishop-move' )  : isLight ? "light" : "dark"}`}
            />
          );
        })
      )}
    </div>
  );
}
