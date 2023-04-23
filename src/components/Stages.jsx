import lock from '../img/lock.png'
import border from '../img/border.png'
import instruction from '../img/Instruction.png'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { ScoreContext } from '../context/ScoreContext'
import Message from './Message'
const message = "You're in ruins, looking for treasure but a bad ghost is following you. There are four tough stages to pass, and if you fail, the ghost catches you and you have to start over from the beginning.All the unlocked stages will locked again,So Be careful and use your brain to solve problems. If not, you'll be stuck in an endless cycle of fear.";

const Stages = () => {
  const [lock2, setLock2] = useState(true)
  const [lock3, setLock3] = useState(true)
  const [lock4, setLock4] = useState(true)
  const [show, setShow] = useState(false)
  const [instructions, setInstructions] = useState(false)
  const { currentUser } = useContext(UserContext)
  const { score, unlock, setUnlock, setStage, stage } = useContext(ScoreContext)
  const navigate = useNavigate();

  useEffect(() => {
    if(stage === "WinPage"){ setStage("stages")}
    if (stage === "stages") { setShow(true); }
    const k = "/" + stage;
    navigate(k);
  }, [stage])

  useEffect(() => {
    if (!currentUser) { navigate("/"); }
  }, [currentUser])

  useEffect(() => {
    if (unlock >= 2) { setLock2(false) }
    if (unlock >= 3) { setLock3(false) }
    if (unlock >= 4) { setLock4(false) }
  }, [unlock])

  const handleMsgClick = () => {
    setInstructions(!instructions);
  }
  return (
    <>
      {show &&
        <div className='Stages'>
          <div className='container'>
            <div className="sketchfab-embed-wrapper game">
              <iframe
                title="My 3D Model"
                frameBorder="0"
                muted
                height="100%"
                width="100%"
                src="https://sketchfab.com/models/d822db4920114f7f9910023c2ebe58f3/embed?autostart=1&camera-controls=0"
              />
            </div>
          </div>
          <div className='stages'>
            <div onClick={() => { setStage("theme1"); navigate("/theme1"); }} className='theme1 border'><div><img src={border} alt="." /></div></div>
            <div onClick={() => { if (unlock >= 2) setStage("theme2"); navigate("/theme2") }} className={`theme2 border ${lock2 ? "dark" : ""}`}><div><img src={border} alt="." />{lock2 && <img className="lock" src={lock} alt="." />}</div></div>
            <div onClick={() => { if (unlock >= 3) setStage("theme3"); navigate("/theme3") }} className={`theme3 border ${lock3 ? "dark" : ""}`}><div><img src={border} alt="." />{lock3 && <img className="lock" src={lock} alt="." />}</div></div>
            <div onClick={() => { if (unlock >= 4) setStage("theme4"); navigate("/theme4") }} className={`theme4 border ${lock4 ? "dark" : ""}`}><div><img src={border} alt="." />{lock4 && <img className="lock" src={lock} alt="." />}</div></div>
            <button className='start' onClick={() => { setUnlock(1); setStage("theme1"); navigate("/theme1") }}><span>START</span></button>
          </div>
          <div className='Score'>
            <span >Score</span>
            <span>{score}</span>
          </div>
          <div className='instructions'>
            <img onClick={() => { setInstructions(!instructions) }} src={instruction} alt="." />
            {instructions && <Message msg={message} handleMsgClick={handleMsgClick} win={"Box4"} />}
          </div>
        </div>
      }
    </>
  )
}

export default Stages