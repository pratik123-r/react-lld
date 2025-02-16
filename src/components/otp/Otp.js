import { memo, useEffect, useRef, useState } from "react";
import './otp.css'


export default memo(function Otp({ otpLength, onOtpChange }) {
    const [otp, setOTP] = useState(new Array(otpLength).fill(""))
    const otpRef = useRef(new Array(otpLength).fill(""))

    useEffect(() => {
        otpRef.current[0].focus()
    }, [])

    useEffect(() => {
        onOtpChange(()=> otp.join(''))
    }, [otp])

    function onKeyPress(e, index) {
        if (e.key === "Backspace") {
            setOTP((currentVal) => {
                let val = [...currentVal]
                val[index] = ''; 
                return val
            })
            if (index > 0)
                otpRef.current[index - 1].focus()
        } else {
            setOTP((currentOtp) => {
                let val = [...currentOtp]
                val[index] = e.key    
                return val
            })

            if (index + 1 < otpLength)
                otpRef.current[index + 1].focus()
            else
                otpRef.current[index].blur()
        }
    }
    return (<>
        <div className="otp-container">
            {otp.map((val, index) => (
                <input className="input"
                    key={index} ref={(el) => 
                    otpRef.current[index] = el}
                    onChange={() => { }} 
                    onKeyUp={(e) => onKeyPress(e, index)} 
                    value={val}
                 >
                </input>
            ))}
        </div>
    </>)
})


