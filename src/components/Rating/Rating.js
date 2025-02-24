import { useState } from 'react'
import './Rating.css'

function Rating({ totalStars, currentRating, onChange }) {
    const [hover, setHover] = useState(0)

    function onSetRating(index) {
        onChange({value : index})
    }

    return (
        <>
            <div className='star-container'>
                {
                    new Array(totalStars).fill(1).map((val, index) => (
                        <div
                            key={index}
                            onMouseEnter={() => setHover(index + 1)}
                            onMouseLeave={() => setHover(0)}
                            onClick={() => onSetRating(index + 1)}
                            className={`star  ${(currentRating > index || hover > index) ? 'backgroung' : ''} `}
                        >
                        </div>
                    ))
                }
            </div>

        </>
    )
}


export default function RatingConfig() {
    const [rating, setRating] = useState()
    return (<>
        <Rating totalStars={5} currentRating={rating}  onChange={({value}) => setRating(value)}>

        </Rating>
    </>)

}