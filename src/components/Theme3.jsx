import bible from '../img/bible.png';
import keys from '../img/keys.png';
import jesus from '../img/jesus.png';
import om from '../img/om.png';
import water from '../img/water.png';
import heart from '../img/heart.png'
import loseBorder from '../img/border.png'
import { useContext, useEffect, useState } from 'react';
import { ScoreContext } from '../context/ScoreContext';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Message from './Message';
const message = "I am glad to hear that you have recovered from your injuries. Now, you must continue your quest to find the treasure that you seek.You must search the old library for clues that will bring you closer to the treasure. Look closely and pay attention to hints that will guide you to specific items you must find.Good luck on your journey, player. I am here to guide you.";

const Win = () => {
  const navigate = useNavigate();
  const { score, setFoundEle, setNum, setStage } = useContext(ScoreContext)
  const { user } = useContext(UserContext)
  const handleHomeClick = () => {
    setFoundEle([])
    setNum(0)
    setStage("stages");
    navigate("/stages");
  }
  const handleNextClick = () => {
    setFoundEle([])
    setNum(0)
    setStage("theme4");
    navigate("/theme4")
  }
  return (
    <>
      <div className='Win Box3'></div>
      <div className='win-box'>
        <div className='container'>
        <div className="sketchfab-embed-wrapper game">
          <iframe
            title="My 3D Model"
            frameBorder="0"
            allow="autoplay; fullscreen; vr"
            muted
            height="120%"
            width="120%"
            src="https://sketchfab.com/models/8e3ffbeea4934eeb981808be0853d4bb/embed?autostart=1"
          // src="https://sketchfab.com/models/feec89011d1642a697f3f6c286397c08/embed?autostart=1"
          />
        </div>
        </div>
        <p className='win'>You Win</p>
        <p className='level'>Level 3 Completed</p>
        <p className='score'>Your Score : {score}</p>
        <p className='score'>Your Max Score : {user.maxScore}</p>
        <div class="buttons">
          <button onClick={handleHomeClick} className='home'>Home</button>
          <button onClick={handleNextClick} className='restart'>Next</button>
        </div>
      </div>
    </>
  )
}

const Lose = () => {
  const navigate = useNavigate();
  const { score,setScore, setUnlock, setNum, setFoundEle, setStage } = useContext(ScoreContext)
  const { user } = useContext(UserContext)
  const handleHomeClick = () => {
    setFoundEle([])
    setNum(0)
    setUnlock(1);
    setScore(0);
    setStage("stages");
    navigate("/stages");
  }
  return (
    <>
      <div className='Alert Box3'></div>
      <div className='lose-box'>
        <img className="border-img" src={loseBorder} alt="."/>
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
    <div className='Alert Box3'></div>
  )
}

const Theme3 = () => {
  const [clue1, setClue1] = useState(true)
  const [clue2, setClue2] = useState(true)
  const [clue3, setClue3] = useState(true)
  const [clue4, setClue4] = useState(true)
  const [clue5, setClue5] = useState(true)
  const [clue6, setClue6] = useState(true)
  const [lives, setLives] = useState(3)
  const [wrong, setWrong] = useState(false)
  const [show, setShow] = useState(false)
  const [msg, setMsg] = useState(true)
  const [findNo, setFindNo] = useState(0)
  const [win, setWin] = useState(false)
  const [lose, setLose] = useState(false)
  const [timer, setTimer] = useState(0)
  const [k, setK] = useState(0)
  const [cRed, setCRed] = useState("")
  const { score, setScore, setUnlock, unlock, foundEle, setFoundEle, stage, setStage, num, setNum } = useContext(ScoreContext);
  const { currentUser, user, setUser } = useContext(UserContext)
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!currentUser) { navigate("/"); }
  }, [currentUser]);

  useEffect(() => {
    if (unlock >= 3) { setShow(true) }
    else { navigate("/stages") }
  }, [unlock]);

  useEffect(() => {
    const k = "/" + stage;
    navigate(k);
  }, [stage])

  useEffect(() => {
    const time = setInterval(() => {
      if (timer > 0) {
        if (timer == 6) { setCRed("c-red") }
        setTimer(timer - 1);
      } else {
        if(k){
        setLose(true)
        setNum(0);
        setFoundEle([]);
        setUser({ ...user, matchPlayed: user.matchPlayed + 1 });
        }
        clearInterval(time);
      }
    }, 1000);
    return () => clearInterval(time);
  }, [timer]);

  useEffect(() => {
    if (score > user.maxScore) {
      setUser({ ...user, maxScore: score });
    }
  }, [score])

  useEffect(() => {
    window.scrollTo(300, 300);
    let k = num;
    if(foundEle.length<num)k=foundEle.length;
    for (let i = 0; i < k; i++) {
      let no = foundEle[i];
      if (no == 1) { setClue1(false); }
      else if (no == 2) { setClue2(false); }
      else if (no == 3) { setClue3(false); }
      else if (no == 4) { setClue4(false); }
      else if (no == 5) { setClue5(false); }
      else if (no == 6) { setClue6(false); }
    }
  }, []);

  const handleClick = (no, e) => {
    if (no == 0) { if (lives == 1) { setLose(true); setUser({ ...user, matchPlayed: user.matchPlayed + 1 }); setFoundEle([]); setNum(0); } setLives(lives - 1); setWrong(true); }
    else if (no == 1) { setClue1(false); }
    else if (no == 2) { setClue2(false); }
    else if (no == 3) { setClue3(false); }
    else if (no == 4) { setClue4(false); }
    else if (no == 5) { setClue5(false); }
    else if (no == 6) { setClue6(false); }
    if (no > 0) { setScore(score + 50 * timer); setTimer(20); if (num == 5) { setFoundEle([]); setNum(0); setWin(true); if (unlock < 4) setUnlock(4); } setFoundEle([...foundEle, no]); setNum(num + 1); setCRed(""); }
  }

  const handleMsgClick=()=>{
    setK(1);
    setTimer(20);
    setMsg(false);
  }

  const componentsToRender = [];
  for (let i = 0; i < lives; i++) {
    componentsToRender.push(<img src={heart} key={i} alt="."/>);
  }
  return (
    <>{show &&
        <div className="Theme3">
          <div className="back" onClick={(e) => { handleClick(0, e) }} ></div>
          <div className='clue-back'>
          {clue1 && <img className="knife" onClick={(e) => { handleClick(1, e) }} src="https://freepngimg.com/thumb/knife/27688-5-knife-image.png" alt="."/>}
          {clue2 && <img className="bible" onClick={(e) => { handleClick(2, e) }} src={bible} alt="."/>}
          {clue3 && <img className="keys" onClick={(e) => { handleClick(3, e) }} src={keys} alt="."/>}
          {clue4 && <img className="jesus" onClick={(e) => { handleClick(4, e) }} src={jesus} alt="."/>}
          {clue5 && <img className="om" onClick={(e) => { handleClick(5, e) }} src={om} alt="."/>}
          {clue6 && <img className="water" onClick={(e) => { handleClick(6, e) }} src={water} alt="."/>}
        </div>
        <div className='box box3'>
          <div>{clue1 ? <span>1</span> : <img className="knife" src="https://freepngimg.com/thumb/knife/27688-5-knife-image.png" alt="."/>}</div>
          <div>{clue2 ? <span>2</span> : <img className="bible" src={bible} alt="."/>}</div>
          <div>{clue3 ? <span>3</span> : <img className="keys" src={keys} alt="."/>}</div>
          <div>{clue4 ? <span>4</span> : <img className="jesus" src={jesus} alt="."/>}</div>
          <div>{clue5 ? <span>5</span> : <img className="om" src={om} alt="."/>}</div>
          <div>{clue6 ? <span>6</span> : <img className="water" src={water} alt="."/>}</div>
        </div>
        <div className='clue-box  clue-box2'>
          <div className='timer timer3'><span className={cRed}>{timer}</span></div>
          <div className='clues clues3'>
            <button>{clue1 && <span>Holy Sword</span>}</button>
            <button>{clue2 && <span>Book</span>}</button>
            <button>{clue3 && <span>Key</span>}</button>
            <button>{clue4 && <span>Christian Logo</span>}</button>
            <button>{clue5 && <span>Om</span>}</button>
            <button>{clue6 && <span>Pot</span>}</button>
          </div>
          <div className='timer timer3'>
            <span className='score'>Score : </span>
            <span className='score'>{score}</span>
          </div>
        </div>
        <div className='lives'>
          {componentsToRender}
        </div>
        {wrong && <WrongAlert setWrong={setWrong} />}
        {win && <Win />}
        {lose && (!win) && <Lose />}
        {msg && <Message msg={message}  handleMsgClick={handleMsgClick} win="Box3"/>}
      </div>}
      </>
  )
}

export default Theme3