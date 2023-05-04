import { useState } from 'react'
import './Button.css'

const Button = (props) => {
    const buttonHoldHandler = (e) => {
        e.preventDefault();
        props.onGameStart();
    }

    const buttonStopHandler = () => {
        if (props.isPlaying) {
            props.onGameEnd();
        }
    }

    return (
        <>
            <button className={`btn ${props.btnStyle}`} onTouchStart={buttonHoldHandler} onTouchEnd={buttonStopHandler} onTouchCancel={buttonStopHandler} onMouseDown={buttonHoldHandler} onMouseOut={buttonStopHandler} onMouseUp={buttonStopHandler}>{props.text}</button >
        </>
    )
}

export default Button;