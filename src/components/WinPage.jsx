import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { ScoreContext } from '../context/ScoreContext';

const WinPage = () => {
    const [show, setShow] = useState(false)
    const { currentUser } = useContext(UserContext);
    const { stage, setStage } = useContext(ScoreContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!currentUser) { navigate("/"); }
    }, [currentUser])

    useEffect(() => {
        if (stage === "WinPage") { setShow(true); }
        const k = "/" + stage;
        navigate(k);
    }, [stage])
    const handleClick = () => {
        setStage("stages");
        navigate("/stages");
    }
    return (
        <>
            {show &&
                <div className='feed WinPage'>
                    <div className='container'>
                    <div className="sketchfab-embed-wrapper game">
                        <iframe
                            title="My 3D Model"
                            frameBorder="0"
                            allow="autoplay; fullscreen; vr"
                            muted
                            height="100%"
                            width="100%"
                            src="https://sketchfab.com/models/d822db4920114f7f9910023c2ebe58f3/embed?autostart=1&camera-controls=0"
                        />
                    </div>
                    </div>
                    <div className='letter'>
                        <p>Great job, adventurer! You have successfully completed the game filled with scary challenges and have come out as a winner. As a token of my appreciation for your bravery, I, the ghost who guarded the treasure, give you all the riches that you have earned. Let this treasure remind you of your courage and determination on this journey, and motivate you to explore new adventures in the future. Congratulations!</p>
                    </div>
                    <button className="button" onClick={handleClick}><span>Restart The Game Again...</span></button>
                </div>
            }
        </>
    )
}

export default WinPage