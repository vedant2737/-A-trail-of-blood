import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext';
import Login from './Login';
import { useNavigate } from 'react-router-dom';
import { ScoreContext } from '../context/ScoreContext';

const Feed = () => {
  const navigate = useNavigate();
  const {currentUser} = useContext(UserContext);
  const {stage,setStage,score,setScore} = useContext(ScoreContext);
  const [login,setLogin]=useState(false);
  const handleClick=()=>{
    if(!currentUser){ setLogin(!login)}
    else{ 
      if(!score){setScore(0);}
      if(stage === "WinPage"){ setStage("stages"); navigate("/stages"); }
      const k = "/"+stage;
      navigate(k);
     }
  }
  
  return (
    <div className='feed'>
      <div className='container'>
      <div className="sketchfab-embed-wrapper game">
        <iframe
          title="My 3D Model"
          frameBorder="0"
          allow="autoplay; fullscreen; vr"
          muted
          height="100%"
          width="120%"
          src="https://sketchfab.com/models/f709acd09d9640698bfc5baa14f30fe9/embed?autostart=1"
        />
      </div>
      </div>
      <div className='logo'>
          <span>B</span>
          <span>l</span>
          <span>o</span>
          <span>o</span>
          <span>d</span>
          <span>y</span>
          <span> </span>
          <span>T</span>
          <span>r</span>
          <span>a</span>
          <span>i</span>
          <span>l</span>
      </div>
      <button className="button" onClick={handleClick}><span>PLAY GAME</span></button>
      <Login popup={login} setLogin={setLogin}/>
    </div>
  )
}

export default Feed