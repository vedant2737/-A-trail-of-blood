import injection from '../img/injection.png';
import syrup from '../img/syrup.png';
import medicalKit from '../img/medical-kit.png';
import medicines from '../img/medicines.png';
import scissor from '../img/scissors.png';
import mask from '../img/mask.png';
import heart from '../img/heart.png'
import loseBorder from '../img/border.png'
import { useContext, useEffect, useState } from 'react';
import { ScoreContext } from '../context/ScoreContext';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Message from './Message';
const message = "You are in a dire situation and must act quickly to find the necessary medical items. Search your surroundings carefully and pay close attention to the hints I provide.Time is of the essence, so do not waste a moment. Your survival depends on finding the medical items before it's too late.Stay strong, player. I am here to guide you through this difficult time.";

const Win = () => {
  const navigate = useNavigate();
  const { score,level,setLevel, setNum, setFoundEle, setStage } = useContext(ScoreContext)
  const { user } = useContext(UserContext)
  if (level < 3) setLevel(3);
  const handleHomeClick = () => {
    setFoundEle([])
    setNum(0)
    setStage("stages");
    navigate("/stages");
  }
  const handleNextClick = () => {
    setFoundEle([])
    setNum(0)
    setStage("theme3");
    navigate("/theme3")
  }
  return (
    <>
      <div className='Win Box2'></div>
      <div className='win-box'>
        <div className='container'>
          <div className="sketchfab-embed-wrapper game">
          </div>
        </div>
        <p className='win'>You Win</p>
        <p className='level'>Level 2 Completed</p>
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
  const { score, setScore, setLevel, setNum, setFoundEle, setStage } = useContext(ScoreContext)
  const { user } = useContext(UserContext)
  const handleHomeClick = () => {
    setLevel(1);
    setFoundEle([]);
    setNum(0);
    setScore(0);
    setStage("stages");
    navigate("/stages");
  }
  return (
    <>
      <div className='Alert Box2'></div>
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
    <div className='Alert Box2'></div>
  )
}

const Theme2 = () => {
  const [clue1, setClue1] = useState(true)
  const [clue2, setClue2] = useState(true)
  const [clue3, setClue3] = useState(true)
  const [clue4, setClue4] = useState(true)
  const [clue5, setClue5] = useState(true)
  const [clue6, setClue6] = useState(true)
  const [lives, setLives] = useState(2)
  const [msg, setMsg] = useState(true)
  const [show, setShow] = useState(false)
  const [wrong, setWrong] = useState(false)
  const [win, setWin] = useState(false)
  const [lose, setLose] = useState(false)
  const [timer, setTimer] = useState(0)
  const [k, setK] = useState(0)
  const [cRed, setCRed] = useState("")
  const { score, setScore, setLevel, level, foundEle, setFoundEle, stage, num, setNum ,setMatchPlayed,setMaxScore} = useContext(ScoreContext);
  const { currentUser, user} = useContext(UserContext)
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) { navigate("/"); }
  }, [currentUser]);

  useEffect(() => {
    if (level >= 2) { setShow(true) }
    else { navigate("/stages") }
  }, [level]);

  useEffect(() => {
    const k = "/" + stage;
    navigate(k);
  }, [stage])

  useEffect(() => {
    const time = setInterval(() => {
      if (timer > 0) {
        if (timer === 6) { setCRed("c-red") }
        setTimer(timer - 1);
      } else {
        if (k) {
          setLose(true)
          setNum(0);
          setFoundEle([]);
          setMatchPlayed(user.matchPlayed+1);
        }
        clearInterval(time);
      }
    }, 1000);
    return () => clearInterval(time);
  }, [timer]);

  useEffect(() => {
    if (score > user.maxScore) {
      setMaxScore(score);
    }
  }, [score])

  useEffect(() => {
    window.scrollTo(20, 100);
    let k = num;
    if (foundEle.length < num) k = foundEle.length;
    for (let i = 0; i < k; i++) {
      let no = foundEle[i];
      if (no === 1) { setClue1(false); }
      else if (no === 2) { setClue2(false); }
      else if (no === 3) { setClue3(false); }
      else if (no === 4) { setClue4(false); }
      else if (no === 5) { setClue5(false); }
      else if (no === 6) { setClue6(false); }
    }
  }, []);

  const handleClick = (no, e) => {
    if (no === 0) { if (lives === 1) { setLose(true); setMatchPlayed(user.matchPlayed+1); setFoundEle([]); setNum(0); } setLives(lives - 1); setWrong(true); }
    else if (no === 1) { setClue1(false); }
    else if (no === 2) { setClue2(false); }
    else if (no === 3) { setClue3(false); }
    else if (no === 4) { setClue4(false); }
    else if (no === 5) { setClue5(false); }
    else if (no === 6) { setClue6(false); }
    if (no > 0) { setScore(score + 50 * timer); setTimer(20); if (num === 5) { if (level < 3) setLevel(3); setWin(true); setFoundEle([]); setNum(0); } setFoundEle([...foundEle, no]); setNum(num + 1); setCRed(""); }
  }
  const handleMsgClick = () => {
    setK(1);
    setTimer(20);
    setMsg(false);
  }

  const componentsToRender = [];
  for (let i = 0; i < lives; i++) {
    componentsToRender.push(<img src={heart} key={i} alt="." />);
  }
  return (
    <>
      {show &&
          <div className="Theme2">
            <div className='back' onClick={(e) => { handleClick(0, e) }}></div>
            <div className='clue-back'>
            {clue1 && <img className="injection" onClick={(e) => { handleClick(1, e) }} src={injection} alt="." />}
            {clue2 && <img className="syrup" onClick={(e) => { handleClick(2, e) }} src={syrup} alt="." />}
            {clue3 && <img className="medicines" onClick={(e) => { handleClick(3, e) }} src={medicines} alt="." />}
            {clue4 && <img className="medical-kit" onClick={(e) => { handleClick(4, e) }} src={medicalKit} alt="." />}
            {clue5 && <img className="scissor" onClick={(e) => { handleClick(5, e) }} src={scissor} alt="." />}
            {clue6 && <img className="mask" onClick={(e) => { handleClick(6, e) }} src={mask} alt="." />}
            </div>
          <div className='box box2'>
            <div>{clue1 ? <span>1</span> : <img className="injection" src={injection} alt="." />}</div>
            <div>{clue2 ? <span>2</span> : <img className="syrup" src={syrup} alt="." />}</div>
            <div>{clue3 ? <span>3</span> : <img className="medicines" src={medicines} alt="." />}</div>
            <div>{clue4 ? <span>4</span> : <img className="medical-kit" src={medicalKit} alt="." />}</div>
            <div>{clue5 ? <span>5</span> : <img className="scissor" src={scissor} alt="." />}</div>
            <div>{clue6 ? <span>6</span> : <img className="mask" src={mask} alt="." />}</div>
          </div>
          <div className='clue-box clue-box2'>
            <div className='timer'><span className={cRed}>{timer}</span></div>
            <div className='clues'>
              <button>{clue1 && <span>Injection</span>}</button>
              <button>{clue2 && <span>Energy Drink</span>}</button>
              <button>{clue3 && <span>Medicine</span>}</button>
              <button>{clue4 && <span>MediKit</span>}</button>
              <button>{clue5 && <span>Scissor</span>}</button>
              <button>{clue6 && <span>Oxygen-Mask</span>}</button>
            </div>
            <div className='timer'>
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
          {msg && <Message msg={message} handleMsgClick={handleMsgClick} win="Box2" />}
          </div>
          }
    </>
  )
}

export default Theme2