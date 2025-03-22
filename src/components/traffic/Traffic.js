
import './Traffic.css'
export default function Traffic({ active }) {

    return (<>
        <div className="traffic-container">
            {['red', 'yellow', 'green'].map((color) => (
                <div key={color} className={`light ${active === color ? color : 'inactive'}`}></div>
            ))}
        </div>

    </>)
}