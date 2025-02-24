import './Grid.css'
import { useEffect, useRef, useState } from "react";


function Grid({ n }) {
    const [ grid, setGrid ] = useState(new Array(n * n).fill(false))
    const [ gridStack, setGridStack ] = useState([])
    const isPoping = useRef(false)

    function fillColor(index) {
       const tempGrid = [...grid]
       tempGrid[index] = true
       setGrid(tempGrid)

       const tempGridStack = [...gridStack]
       tempGridStack.push(index)
       setGridStack(tempGridStack)
    }

    function revert() {
        const tempGridStack = [...gridStack]
        let index = tempGridStack.pop()
        setGridStack(tempGridStack)

        if(tempGridStack.length === 0)
            isPoping.current = false 

        const tempGrid = [...grid]
        tempGrid[index] = false
        setGrid(tempGrid)
    }

    useEffect(()=>{
        let timeout
        if(gridStack.length === n * n || isPoping.current) {
            isPoping.current = true
            timeout = setTimeout(revert, 1000);
        }
        return () => {
            clearTimeout(timeout)
        }
    }, [grid])

    return (
        <>
            <div className='grid-stack-container' style={{ gridTemplateColumns: `repeat(${n}, 0fr)` }}>
                {
                    grid.map((data, index) => (
                        <div onClick={() => fillColor(index)}   className={`grid ${isPoping.current ? 'disable' : ''} ${data ? 'yellow-background disable' : ''}`}>

                        </div>
                    ) )
                }
            </div>
        </>
    )
}

export default function GridConfig() {

    return (
        <>
            <Grid n={4}></Grid>
        </>
    )
}