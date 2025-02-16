import './Progress.css'

export default function Progress({complete}) {
    return (
        <>
            <div className="progress-bar">
                <div className='inner-div' style={{"width": complete > 100 ? 100 : complete + '%'}}>

                </div>
            </div>
        </>
    )
}