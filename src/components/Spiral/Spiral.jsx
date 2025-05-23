import { useEffect, useMemo, useState } from 'react';
import './Spiral.css'
const N = 11;
function getCellsInSpairalOrder() {
    let ans = []
    let top = 0;
    let right = N - 1;
    let bottom = N - 1;
    let left = 0;

    while (top <= bottom && right >= left) {
        for (let index = left; index <= right; index++) {
            ans.push([top, index])

        }
        top++;
        for (let index = top; index <= bottom; index++) {
            ans.push([index, right])
        }
        right--;

        for (let index = right; index >= left; index--) {
            ans.push([bottom, index])
        }
        bottom--

        for (let index = bottom; index >= top; index--) {
            ans.push([index, left])
        }
        left++;
    }
    return ans
}
export default function Spairal() {

    const cellOrder = useMemo(() => getCellsInSpairalOrder(), [])

    const [activeCell, setActive] = useState([0,0])

    useEffect(() => {
        let cellInd = 1
        const interval = setInterval(() => {
            if (cellInd >= cellOrder.length) {
                clearInterval(interval)
                return
            }
            setActive(cellOrder[cellInd])
            cellInd++
        }, 200);
        return () => clearInterval(interval)
    }, [])

    return (
        <>
            <div className='sg' style={{gridTemplateColumns: `repeat(${N}, 25px)`}}>
                {new Array(N).fill(0).map((_, row) => {
                    return new Array(N).fill(0).map((_, col) => {
                        return (<div className={`sg-cell ${(row === activeCell[0] && col === activeCell[1]) ? 'bg' : ''}`}></div>)
                    })
                })}
            </div>
        </>
    )
}

