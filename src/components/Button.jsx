import { useState } from 'react'
import './Button.css'

const Button = (props) => {
    const buttonHoldHandler = (e) => {
        e.preventDefault();
        props.onGameStart();
    }

    const buttonStopHandler = () => {
        props.onGameEnd();
    }

    return (
        <>
            <button className={`btn ${props.btnStyle}`} onMouseDown={buttonHoldHandler} onMouseOut={buttonStopHandler} onMouseUp={buttonStopHandler}>{props.text}</button >
        </>
    )
}

export default Button;