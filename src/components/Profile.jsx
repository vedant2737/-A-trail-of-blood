import React, { useContext, useEffect, useState } from 'react'
import cross from '../img/cross.png'
import girl from '../img/girl.jpg'
import boy from '../img/boy.jpg'
import { UserContext } from '../context/UserContext'
import Login from './Login'
import { auth, db } from '../firebase'
import { signOut } from 'firebase/auth'
import { collection, doc, getDocs, query, where } from 'firebase/firestore'
const UserView = ({ user }) => {
    return (
        <div className='user'>
            <div>
                <img src={user?.photoURL ? user.photoURL : user?.gender === "female" ? girl : boy} alt="." />
                <p>{user.displayName}</p>
            </div>
            <span>score : {user.maxScore}</span>
        </div>
    )
}
const Profile = () => {
    const { currentUser, user, setUser } = useContext(UserContext)
    const [show, setShow] = useState(false  );
    const [allUsers, setAllUsers] = useState([]);
    useEffect(() => {
        const get = async () => {
            const q = query(collection(db, "users"), where("totalCoins", "==", 0));
            try {
                const querySnapshot = await getDocs(q);
                if (querySnapshot.empty) { console.log("empty"); setAllUsers([]); }
                let setalluser = [];
                querySnapshot.forEach((doc) => {
                    setalluser.push(doc.data());
                });
                setAllUsers(setalluser);
            } catch (err) {
                console.error(`Error getting documents.`);
            }
        }
        get()
    }, [currentUser,user])

    const handleClick = async (u) => {
        setShow(!show)
        if (currentUser && !user) {
            const q = query(collection(db, "users"), where("uid", "===", currentUser.uid));
            try {
                const querySnapshot = await getDocs(q);
                if (querySnapshot.empty) { setUser(null) }
                let setuser = null;
                querySnapshot.forEach((doc) => {
                    setuser = doc.data();
                });
                setUser(setuser)
            } catch (e) {
                console.log("something Went Wrong")
            }
        }
    }
    const handleLogOut = () => {
        setUser(null);
        signOut(auth);
    }
    return (
        <>
            {currentUser ?
                <div className='Profile'>
                    <button onClick={handleClick}><img src={user?.photoURL ? user.photoURL : user?.gender === "female" ? girl : boy} alt="." /></button>
                    {show &&
                        <div className={`profile`}>
                            <img className="cross" onClick={handleClick} src={cross} alt="." />
                            <div className='user-detail'>
                                <div><img src={user?.photoURL ? user.photoURL : user?.gender === "female" ? girl : boy} alt="." /></div>
                                <p className='name'>{user?.displayName}</p>
                                <p>Max Score : {user?.maxScore}</p>
                                <p>Total Match Played : {user?.matchPlayed}</p>
                                <p>Total Winnings : {user?.winGames}</p>
                            </div>
                            <button className="logout" onClick={() => { handleLogOut() }}>Logout</button>
                            <div className='leader-board'>
                                <h1>Leaderboard</h1>
                                {
                                    allUsers?.sort((a, b) => b?.maxScore - a?.maxScore).map(User => {
                                        return (
                                            <UserView user={User} />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    }
                </div>
                :
                <Login />
            }
        </>
    )
}

export default Profile