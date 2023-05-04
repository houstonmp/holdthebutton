import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Button from './components/Button'
import './App.css'

function App() {
  const [btntext, setBtnText] = useState("Hold me!");
  const gameState = useRef({
    isPlaying: false,
    startTime: undefined
  });
  const [btnStyle, setStyle] = useState('');
  const [mainStyle, setMain] = useState('');
  const timeObj = useRef({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0
  })
  // const [timer, setTimer] = useState({
  //   start: undefined,
  //   end: undefined
  // });

  const colorStyles = ['green', 'orange', 'blue', 'red'];
  const sizeStyles = ['longRect', 'wideRect', 'skinnyRect', 'skinnyWideRect'];
  const moveStyles = ['moveLeft', 'moveCenter', 'moveRight', 'moveUp', 'moveDown'];

  const onGameStart = () => {
    gameState.current = {
      isPlaying: true,
      startTime: Date().toLocaleString()
    }
  }

  const [timer, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
    fullTime: `0:0:0:0:00`
  });

  const getTime = () => {
    if (gameState.current.isPlaying) {
      const time = Date.now() - Date.parse(gameState.current.startTime);
      timeObj.current = {
        days: Math.floor((time / (1000 * 60 * 60 * 24))),
        hours: Math.floor((time / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((time / 1000 / 60) % 60),
        seconds: Math.floor((time / 1000) % 60),
        milliseconds: Math.floor(time) % 1000,
      };


      // console.log("Setting Time Object:", timeObj, timer.seconds);
      setTime({ ...timeObj.current, fullTime: `${timeObj.current.days}:${timeObj.current.hours}:${timeObj.current.minutes}:${timeObj.current.seconds}:${timeObj.current.milliseconds}` });

      // setObj(timeObj);
    }

  };

  const onGameEnd = () => {
    gameState.current = (current) => {
      return {
        isPlaying: false,
        startTime: current.startTime
      }
    }

    setStyle('')
    // console.log(`Final time:${timer.fullTime}`);
  }

  const onChangeStyling = () => {
    let size = '';
    let styling = '';
    let move = '';

    if (gameState.current.isPlaying && timeObj.current.seconds >= 5) {
      let color = Math.floor((Math.random() * colorStyles.length));
      styling = `${colorStyles[color]}`;
      if (timeObj.current.seconds >= 10) {
        size = Math.floor((Math.random() * sizeStyles.length));
        styling += ` ${sizeStyles[size]}`
        if (timeObj.current.seconds >= 20) {
          move = Math.floor((Math.random() * moveStyles.length));
          styling += ` ${moveStyles[move]}`
        }
      }
      // console.log("Color", color, "Size", size);
      setStyle(styling);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => { getTime(gameState.startTime) }, 10);

    const interval2 = setInterval(() => onChangeStyling(), 2000);
    // setTimeout(() => onChangeStyling(timer), 2000);
    return () => {
      clearInterval(interval);
      clearInterval(interval2);
    }
  }, [gameState.current.isPlaying]);

  // useEffect(() => {
  //   console.log("Enterring Use Effect");
  //   const interval = setInterval(() => onChangeStyling(), 2000);
  //   console.log(interval);
  //   return () => clearInterval(interval);
  // }, [gameState.isPlaying]);

  return (
    <>
      <h1>Hold the Button Rodeo</h1>
      {<h2 className="timer">{(gameState.current.isPlaying || gameState.current.startTime) ? timer.fullTime : 'Hold the Button to Start!'}</h2>}
      <main className="">
        <Button text={btntext} onGameStart={onGameStart} onGameEnd={onGameEnd} btnStyle={btnStyle} />
      </main>
    </>
  )
}

export default App
