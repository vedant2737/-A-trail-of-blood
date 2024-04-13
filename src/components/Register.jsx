import React, { useContext, useEffect, useState } from 'react'
import cross from '../img/cross.png'
import Add from "../img/boy.jpg"
import Check from "../img/boy.jpg"
import defaultUserImage from '../img/defautUserImage.webp'
import Login from './Login'
import { UserContext } from '../context/UserContext'
import { ScoreContext } from '../context/ScoreContext'
import { CircularProgress } from '@mui/material'
import axios from 'axios'

const Register = ({ popup = false, handleClick1 }) => {
    const { setUser ,setCurrentUser} = useContext(UserContext)
    const {setStage} = useContext(ScoreContext)
    const [show, setShow] = useState(popup)
    const [gender, setGender] = useState("");
    const [err, setErr] = useState("");
    const [pic, setPic] = useState("");
    const [imageData, setImageData] = useState(null);
    const [login, setLogin] = useState(false);
    const [loading,setLoading] = useState(false);
    const handleClick = () => {
        setShow(!show)
        if (handleClick1){
            handleClick1();
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr("")
        const file = e.target[0]?.files[0];
        const displayName = e.target[1].value;
        const email = e.target[2].value;
        const password = e?.target[3]?.value;
        const confirmPassword = e?.target[4]?.value;
        if (password !== confirmPassword) {
            setErr("Password should match."); return;
        }

        setLoading(true);
        try {
                const userData = {
                    displayName,
                    email,
                    gender: gender,
                    maxScore: 0,
                    totalCoins: 0,
                    matchPlayed: 0,
                    winGames: 0,
                    score: 0,
                    level: 1,
                    foundEle: [],
                    num:0,
                    stage:"stages",
                    photoUrl:file
                }
                const newUser = new FormData();
                Object.entries(userData).forEach(([key, value]) => {
                    newUser.append(key, value);
                  });
                console.log(newUser);
                const response = await axios.post("http://localhost:8080/users/add",newUser,{
                 headers: {
                    'Content-Type': 'multipart/form-data',
                  }
                });
                setStage("stages")
                setUser(userData);
                setCurrentUser(userData);
                }
                catch (err) {
                    setErr(err.message)
                    setTimeout(() => {
                        setErr("");
                    }, 2000);
                    console.log(err)
                }
                setLoading(false);
    }
     

    return (
        <>
            <div className='Register'>
                <button className="z-2" onClick={handleClick}><img src={defaultUserImage} /></button>
                {show &&
                    <div className='register'>
                        <img className='cross' onClick={handleClick} src={cross} />
                        <p className='p'>Register</p>
                        <form className="form" onSubmit={handleSubmit}>
                            <input
                                style={{ display: "none" }}
                                type='file' id="file"
                                accept="image/*"
                                onChange={(e) => {
                                    setPic(e.target?.value);
                                }} />
                            <label htmlFor="file">
                                {(pic === "") && <img src={Add} alt="" />}
                                {(pic !== "") && <img src={Check} alt="" />}
                                <span style={{ color: (pic !== "") ? 'green' : 'rgb(175, 175, 175)', wordBreak: 'break-all', position: 'relative' }}>{(pic != "") ? "Selected" : "Add an avtar"}</span>
                            </label>
                            <input type='text' required placeholder="Avatar name" />
                            <input type='email' required placeholder="Email" />
                            <input type='password' required placeholder="Password" />
                            <input type='password' required placeholder="Confirm Password" />
                            <div id="gender">
                                <input id="male" type="radio" name="gender" value="male" onChange={(e) => { setGender(e.target.value) }} />
                                <label htmlFor="male">Male</label>
                                <input id="female" type="radio" name="gender" value="female" onChange={(e) => { setGender(e.target.value) }} />
                                <label htmlFor="female">Female</label>
                            </div>
                            {loading?
                            <div className='disabled-btn'>Sign Up</div>
                             :
                            <button>Sign Up</button>
                              }
                             {loading && <div className='loader'><CircularProgress/></div>}

                            {err && <span>{err}</span>}
                        </form>
                        <p>You do have an account? <span onClick={(e) => { setLogin(true); setShow(false); }}>Login</span></p>
                    </div>
                }
            </div>
            {login && <Login popup={true} />}
        </>
    )
}

export default Register