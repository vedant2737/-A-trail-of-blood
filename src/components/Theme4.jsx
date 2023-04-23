import React, { useContext, useEffect, useState } from 'react'
import keyBox from '../img/key-box.png'
import key from '../img/key.png'
import heart from '../img/heart.png'
import loseBorder from '../img/border.png'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { ScoreContext } from '../context/ScoreContext'
import Message from './Message'
const message = "In the room you have entered, there are three boxes. Inside one of them is the key to the treasure that you seek. However, you only have two chances to find the key. If you choose the wrong box twice, you will have to start from the beginning.Remember that every choice you make brings you closer to, or further from, the treasure. Choose wisely and trust your instincts.Good luck on your journey, player. I am here to guide you, but the final decision is yours.";

const Win = () => {
  const navigate = useNavigate();
  const { user,setUser } = useContext(UserContext)
  const { setScore,setUnlock,setStage} = useContext(ScoreContext)
  const handleHomeClick = () => {
    setStage("stages");
    navigate("/stages");
  }
  const handleNextClick = () => {
    setScore(0);
    setUnlock(1);
    setStage("WinPage");
    navigate("/WinPage")
  }
  return (
    <>
      <div className='Win Box4'></div>
      <div className='win-box border'>
        <div className='key-back'>
          <img className="key" src={key} alt="."/>
        </div>
        <div class="theme4 buttons">
          <button onClick={handleHomeClick} className='home button'>Home</button>
          <button onClick={handleNextClick} className='home button'>Unlock the treasure</button>
        </div>
      </div>
    </>
  )
}

const Lose = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { score,setScore, setUnlock,setStage } = useContext(ScoreContext)
  const handleHomeClick = () => {
    setUnlock(1);
    setScore(0);
    setStage("stages");
    navigate("/stages");
  }
  return (
    <>
      <div className='Alert Box4'></div>
      <div className='lose-box'>
        <img className="border-img" src={loseBorder} alt="." />
        <p className='lose'>You Lose</p>
        <p className='score'>Your Score : {score}</p>
        <p className='score'>Your Max Score : {user.maxScore}</p>
        <button onClick={handleHomeClick} className='home'>Home</button>
      </div>
    </>
  )
}

const WrongAlert = ({ setWrong }) => {
  setTimeout(() => {
    setWrong(false)
  }, 300);
  return (
    <div className='Alert Box4'></div>
  )
}

const Theme4 = () => {
  const [keyNo, setKeyNo] = useState(-1)
  const [key0, setKey0] = useState(false)
  const [key1, setKey1] = useState(false)
  const [key2, setKey2] = useState(false)
  const [win, setWin] = useState(false)
  const [lose, setLose] = useState(false)
  const [lives, setLives] = useState(2)
  const [wrong, setWrong] = useState(false)
  const [show, setShow] = useState(false)
  const [msg, setMsg] = useState(true)
  const { currentUser, user, setUser } = useContext(UserContext)
  const { score, setScore, unlock,stage} = useContext(ScoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) { navigate("/"); }
  }, [currentUser])

  useEffect(() => {
    if (unlock >= 4) { setShow(true) }
    else { navigate("/stages") }
  }, [unlock]);

  useEffect(() => {
    const k = "/" + stage;
    navigate(k);
  }, [stage])

  useEffect(() => {
    const k = Math.floor(Math.random() * 1000) % 3;
    setKeyNo(k);
  }, [])

  const handleClick = (k) => {
    if (keyNo !== k) {
      setLives(lives - 1);
      setWrong(true);
      if (lives === 1) {
        setLose(true); setUser({ ...user, matchPlayed: user.matchPlayed + 1 });
      }
    }
    else {
      setWin(true);
      setUser({ ...user, winGames: user.winGames + 1 ,matchPlayed: user.matchPlayed + 1});
      setScore(score + 10000 + 5000 * lives);

      if (k === 0) setKey0(true)
      else if (k === 1) setKey1(true)
      else setKey2(true)
    }
  }

  const handleMsgClick=()=>{
    setLose(false);
    setMsg(false);
  }

  const componentsToRender = [];
  for (let i = 0; i < lives; i++) {
    componentsToRender.push(<img src={heart} key={i} alt="."/>);
  }
  return (
    <>{show &&
      <>
        <div className='Theme4'>
        <div className='container'>
          <div className="sketchfab-embed-wrapper game ">
            <iframe
              title="My 3D Model"
              frameBorder="1"
              muted
              height="100%"
              width="100%"
              src="https://sketchfab.com/models/d76e767366f947e686011df488d859a1/embed?autostart=1&camera-controls=0"
            />
          </div>
         </div>
          <div className='key-boxes'>
            <div className="img-container">
              <img className="box" onClick={() => { handleClick(0) }} src={keyBox} alt="."/>
              {key0 && <div>
                <img className="key" src={key} alt="."/>
              </div>}
            </div>
            <div className="img-container">
              <img className="box" onClick={() => { handleClick(1) }} src={keyBox} alt="."/>
              {key1 && <div>
                <img className="key" src={key} alt="."/>
              </div>}
            </div>
            <div className="img-container">
              <img className="box" onClick={() => { handleClick(2) }} src={keyBox} alt="."/>
              {key2 && <div>
                <img className="key" src={key} alt="."/>
              </div>}
            </div>
          </div>
        </div>
        <div className='Score'>
          <span >Score</span>
          <span>{score}</span>
        </div>
        <div className='lives'>
          {componentsToRender}
        </div>
        {wrong && <WrongAlert setWrong={setWrong} />}
        {win && <Win />}
        {lose && (!win) &&  (!msg) && <Lose />}
        {msg && <Message msg={message} handleMsgClick={handleMsgClick} win="Box4"/>}
      </>}
    </>
  )
}

export default Theme4