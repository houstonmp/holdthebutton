import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Button from './components/Button';
import Modal from './components/Modal';
import './App.css';

function App() {
  const [btntext, setBtnText] = useState("Hold mouse to start!");
  //Main Game Data
  const gameState = useRef({
    isPlaying: false,
    startTime: undefined,
  });

  //Button Styling
  const [btnStyle, setStyle] = useState('');

  const [displayModal, setModal] = useState({ isDisplay: false, highScores: [] });
  //Time Object for use in calculating Button Styles
  //This function is needed for the onMouseDown Event since
  //useState preserves state within the event
  const timeObj = useRef({
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0
  })

  //Styling options for the game
  const colorStyles = ['green', 'orange', 'blue', 'red'];
  const sizeStyles = ['longRectVertLeft', 'longRectVertRight', 'longRectVertCenter', 'wideRectTop', 'wideRectBottom', 'wideRectCenter'];

  //Start the game
  const onGameStart = () => {
    setBtnText("Hold on!");

    let userScores = localStorage.getItem("userScores");
    if (userScores) {
      gameState.current = {
        isPlaying: true,
        startTime: Date().toLocaleString(),
      }
      setModal({ isDisplay: false, highScores: JSON.parse(userScores) });
    } else {
      gameState.current = {
        isPlaying: true,
        startTime: Date().toLocaleString()
      }
      setModal({ isDisplay: false, highScores: [] });
    }
  }

  //useState timer for the clock
  const [timer, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
    fullTime: `0:0:0:0:00`
  });


  //Set the time and assign it to the timer state
  const getTime = () => {
    if (gameState.current.isPlaying) {
      const time = Date.now() - Date.parse(gameState.current.startTime);

      //timeObj points to the useRef version of the object
      timeObj.current = {
        hours: Math.floor((time / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((time / 1000 / 60) % 60),
        seconds: Math.floor((time / 1000) % 60),
        milliseconds: Math.floor(time) % 1000,
      };

      let tempTime = [`${timeObj.current.hours}`, `${timeObj.current.minutes}`, `${timeObj.current.seconds}`]

      function addZero(times, length) {
        if (times.length === length) {
          console.log(times);
          return times;
        } else {
          return addZero(`0${times}`, length);
        }
      }
      for (let i = 0; i < tempTime.length; i++) {
        if (tempTime[i].length < 2) {
          tempTime[i] = addZero(tempTime[i], 2);
        }
      }
      console.log(tempTime);

      let tempMill = `${timeObj.current.milliseconds}`;

      if (tempMill.length < 3) {
        tempMill = addZero(tempMill, 3);
      }


      setTime({ ...timeObj.current, fullTime: `${tempTime[0]}:${tempTime[1]}:${tempTime[2]},${tempMill}` });

    }

  };

  //Ends game within the button component
  const onGameEnd = () => {
    setBtnText("Try Again!");
    let userScores = localStorage.getItem("userScores")
    if (gameState.current.isPlaying && userScores) {
      userScores = JSON.parse(userScores);
      userScores.push({
        name: "Player 1",
        time: timer.fullTime
      });
      localStorage.setItem("userScores", JSON.stringify(userScores));
    } else {
      userScores = [{
        name: "Player 1",
        time: timer.fullTime
      }]
      localStorage.setItem("userScores", JSON.stringify(userScores));
    }

    gameState.current = (current) => {
      return {
        isPlaying: false,
        startTime: current.startTime,
      }
    }
    setModal({ isDisplay: true, highScores: userScores });

    //Sets the button style back to its default style
    setStyle('')
  }

  const onChangeStyling = () => {
    let size = '';
    let styling = '';
    let btnText = '';

    if (gameState.current.isPlaying && timeObj.current.seconds >= 5) {
      btnText = "Hold on!"
      let color = Math.floor((Math.random() * colorStyles.length));
      styling = `${colorStyles[color]}`;
      if (timeObj.current.seconds >= 10) {
        btnText = "Here we go!"
        size = Math.floor((Math.random() * sizeStyles.length));
        styling += ` ${sizeStyles[size]}`
        if (timeObj.current.seconds >= 30) {
          btnText = "Great Job!"
          if (timeObj.current.minutes >= 1) {
            btnText = "Wow!"
            if (timeObj.current.minutes >= 5) {
              btnText = "Keep going!"
              if (timeObj.current.minutes >= 30) {
                btnText = "Amazing!"
                if (timeObj.current.hours >= 1) {
                  btnText = "What the heck!"
                }
              }
            }
          }
        }
      }
      setBtnText(btnText);
      setStyle(styling);
    }
  }

  //Sets intervals for time management ans button styling
  useEffect(() => {
    const interval = setInterval(() => { getTime(gameState.startTime) }, 10);

    const interval2 = setInterval(() => onChangeStyling(), 2000);

    return () => {
      clearInterval(interval);
      clearInterval(interval2);
    }
  }, [gameState.current.isPlaying]);

  const onCloseModal = () => {
    setModal((prev) => {
      return { isDisplay: false, highScores: prev.highScores }
    });
  }

  return (
    <>
      {displayModal.isDisplay && <Modal currentScore={timer.fullTime} userScores={displayModal.highScores} onCloseModal={onCloseModal} />}
      <h1>Button Wrangler</h1>
      {     /* Stopwatch */}
      {<h2 className="timer">{(gameState.current.isPlaying || gameState.current.startTime) ? timer.fullTime : btntext}</h2>}
      <main className="">
        {/* Button to hold onto */}
        <Button text={btntext} isPlaying={gameState.current.isPlaying} onGameStart={onGameStart} onGameEnd={onGameEnd} btnStyle={btnStyle} />
      </main>
    </>
  )
}

export default App
