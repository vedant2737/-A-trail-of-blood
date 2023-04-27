import hammer from '../img/hammer.png';
import helmet from '../img/helmet.png';
import saw from '../img/saw.png';
import toolBox from '../img/tool-box.png';
import bloodWritten from '../img/blood-written.png';
import heart from '../img/heart.png'
import bloodyBorder from '../img/border.png'
import { useContext, useEffect, useState } from 'react';
import { ScoreContext } from '../context/ScoreContext';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Message from './Message';
const message = "Your objective is to find specific items hidden in this construction area while avoiding being caught by the ghost. If you fail to find the items before the ghost catches you, you lose the game.To help you locate the items, we have provided some hints in the form of their names. Pay close attention to these hints and search the image carefully. You must find all the items before the ghost catches you.Good luck on your treasure hunt, and beware of the ghost!";

const Win = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext)
  const { score, setNum,unlock,setUnlock, setFoundEle, setStage } = useContext(ScoreContext)
  if (unlock < 2) setUnlock(2);
  const handleHomeClick = () => {
    setFoundEle([])
    setNum(0)
    setStage("stages");
    navigate("/stages");
  }
  const handleNextClick = () => {
    setFoundEle([])
    setNum(0)
    setStage("theme2");
    navigate("/theme2")
  }
  return (
    <>
      <div className='Box1 Win'></div>
      <div className='win-box'>
        <div className='container'>
          <div className="sketchfab-embed-wrapper game">
           </div>
        </div>
        <p className='win'>You Win</p>
        <p className='level'>Level 1 Completed</p>
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
  const { score, setScore, setUnlock, setNum, setFoundEle, setStage } = useContext(ScoreContext)
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
      <div className='Box1 Alert'></div>
      <div className='lose-box'>
        <img className="border-img" src={bloodyBorder} alt="." />
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
    <div className='Alert Box1'></div>
  )
}

const Theme1 = () => {
  const [clue1, setClue1] = useState(true)
  const [clue2, setClue2] = useState(true)
  const [clue3, setClue3] = useState(true)
  const [clue4, setClue4] = useState(true)
  const [lives, setLives] = useState(3)
  const [msg, setMsg] = useState(true)
  const [wrong, setWrong] = useState(false)
  const [show, setShow] = useState(false)
  const [win, setWin] = useState(false)
  const [lose, setLose] = useState(false)
  const [cRed, setCRed] = useState("")
  const [timer, setTimer] = useState(0)
  const [k, setK] = useState(0)
  const { score, setScore, setUnlock, unlock, foundEle, setFoundEle, stage, setStage, num, setNum } = useContext(ScoreContext);
  const { currentUser, user, setUser } = useContext(UserContext)
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) { navigate("/"); }
  }, [currentUser])

  useEffect(() => {
    if (stage === "theme1") setShow(true);
    const k = "/" + stage;
    navigate(k);
  }, [stage])

  useEffect(() => {
    const time = setInterval(() => {
      if (timer > 0) {
        if (timer == 6) { setCRed("c-red") }
        setTimer(timer - 1);
      } else {
        if (k) {
          setLose(true)
          setNum(0);
          setFoundEle([]);
          setUser({ ...user, matchPlayed: user.matchPlayed + 1 });
        }
        clearInterval(time);
      }
    }, 1000);
    return () => clearInterval(time);
  }, [timer])

  useEffect(() => {
    if (score > user.maxScore) {
      setUser({ ...user, maxScore: score });
    }
  }, [score])

  useEffect(() => {
    if (lives == 0) {
      setNum(0);
      setFoundEle([]);
      setLose(true);
      setUser({ ...user, matchPlayed: user.matchPlayed + 1 });
    }
  }, [lives])

  useEffect(() => {
    window.scrollTo(120, 100);
    let k = num;
    if (foundEle.length < num) k = foundEle.length;
    for (let i = 0; i < k; i++) {
      let no = foundEle[i];
      if (no == 1) { setClue1(false); }
      else if (no == 2) { setClue2(false); }
      else if (no == 3) { setClue3(false); }
      else if (no == 4) { setClue4(false); }
    }
  }, []);

  const handleClick = (no, e) => {
    if (no == 0) { setLives(lives - 1); setWrong(true);}
    else if (no == 1) { setClue1(false); }
    else if (no == 2) { setClue2(false); }
    else if (no == 3) { setClue3(false); }
    else if (no == 4) { setClue4(false); }
    if (no > 0) { setScore(score + 50 * timer); setTimer(20); if (num == 3) { setFoundEle([]); setNum(0); console.log(foundEle); if (unlock < 2) setUnlock(2); setWin(true); } setFoundEle([...foundEle, no]); setNum(num + 1); setCRed(""); }
  }

  const handleMsgClick = () => {
    setTimer(20);
    setK(1);
    setMsg(false);
  }

  const componentsToRender = [];
  for (let i = 0; i < lives; i++) {
    componentsToRender.push(<img src={heart} key={i} />);
  }
  return (
    <>{show && 
      <div className="Theme1">
        <div className="back" onClick={(e) => { handleClick(0, e)}}></div>
        <div className='clue-back'>
        {clue1 && <img className="hammer" onClick={(e) => { handleClick(1, e) }} src={hammer} alt="." />}
        {clue2 && <img className="helmet" onClick={(e) => { handleClick(2, e) }} src={helmet} alt="." />}
        {clue3 && <img className="saw" onClick={(e) => { handleClick(3, e) }} src={saw} alt="." />}
        {clue4 && <img className="tool-box"  onClick={(e) => { handleClick(4, e) }} src={toolBox} alt="." />}
        <img className="blood-written" onClick={(e) => { handleClick(0, e) }} src={bloodWritten} alt="." />
        </div>
      <div className='box'>
        <div>{clue1 ? <span>1</span> : <img className="hammer" src={hammer} alt="." />}</div>
        <div>{clue2 ? <span>2</span> : <img className="helmet" src={helmet} alt="." />}</div>
        <div>{clue3 ? <span>3</span> : <img className="saw" src={saw} alt="." />}</div>
        <div>{clue4 ? <span>4</span> : <img className="tool-box" src={toolBox} alt="." />}</div>
      </div>
      <div className='clue-box'>
        <div className='timer'><span className={cRed}>{timer}</span></div>
        <div className='clues'>
          <button>{clue1 && <span>Hammer</span>}</button>
          <button>{clue2 && <span>Helmet</span>}</button>
          <button>{clue3 && <span>Saw</span>}</button>
          <button>{clue4 && <span>Tool Kit</span>}</button>
        </div>
        <div className='timer'>
          <span className="score">Score : </span>
          <span className='score'>{score}</span>
        </div>
      </div>
      <div className='lives'>
        {componentsToRender}
      </div>
      {wrong && <WrongAlert setWrong={setWrong} />}
      {win && <Win /> }
      {lose && (!win) && <Lose />}
      {msg && <Message msg={message} handleMsgClick={handleMsgClick} win="Box1" />}
      </div>
    }
    </>
  )
}

export default Theme1