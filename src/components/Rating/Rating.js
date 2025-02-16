import { useState } from 'react'
import './Rating.css'

export default function Rating({ totalStars }) {

    const [currentRating, setCurrentRating ] = useState(0)
    const [hover, setHover ] = useState(0)

    function onSetRating(index) {
        setCurrentRating(index)
    }

    return (
        <>
            <div className='star-container'>
                {
                    new Array(totalStars).fill(1).map((val, index) => (
                        <div 
                            key={index} 
                            onMouseEnter={() => setHover(index+1)} 
                            onMouseLeave={() => setHover(0)} 
                            onClick={() => onSetRating(index+1)} 
                            className={`star  ${ (currentRating > index || hover > index) ? 'backgroung' : ''} `}
                        >
                        </div>
                    ))
                }
            </div>

        </>
    )
}