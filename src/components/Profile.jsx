import React, { useContext, useEffect, useState } from 'react'
import cross from '../img/cross.png'
import girl from '../img/girl.jpg'
import boy from '../img/boy.jpg'
import { UserContext } from '../context/UserContext'
import Login from './Login'
const UserView = ({ User }) => {
    const {user} = useContext(UserContext)
    return (
        <div className='user'>
            <div>
                <img src={User?.photoUrl ? `/images/${User?.photoUrl}`: User?.gender === "female" ? girl : boy} alt="." />
                <p className={User?.displayName===user?.displayName?"fff":""}>{User?.displayName===user?.displayName?"You":User?.displayName}</p>
            </div>
            <span>score : {User?.maxScore}</span>
        </div>
    )
}

const Profile = () => {
    const { currentUser,setCurrentUser,user } = useContext(UserContext)
    const [show, setShow] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    useEffect(() => {
        const get =() => {
            fetch("http://localhost:8080/users/getAll")
            .then(response => {
                if (!response.ok) {
                    console.error(`HTTP error! Status: ${response.status}`);
                }
                return response.json(); 
            })
            .then(data => {
                const sortedData = data.sort((a, b) => b?.maxScore - a?.maxScore);
                setAllUsers(sortedData);
            })
            .catch(err=>{
                console.error(`Error getting documents.`);
            })
        }
        get()
    }, [currentUser])

    const handleClick = async (u) => {
        setShow(!show)
    }
    const handleLogOut = () => {
        setCurrentUser(null);
    }
    return (
        <>
            {currentUser ?
                <div className='Profile'>
                    <button onClick={handleClick}><img src={currentUser?.photoUrl ? currentUser.photoUrl : currentUser?.gender === "female" ? girl : boy} alt="." /></button>
                    {show &&
                        <div className={`profile`}>
                            <img className="cross" onClick={handleClick} src={cross} alt="." />
                            <div className='user-detail'>
                                <div><img src={user?.photoUrl ? user.photoUrl : user?.gender === "female" ? girl : boy} alt="." /></div>
                                <p className='name'>{user?.displayName}</p>
                                <p>Max Score : {user?.maxScore}</p>
                                <p>Total Match Played : {user?.matchPlayed}</p>
                                <p>Total Winnings : {user?.winGames}</p>
                            </div>
                            <button className="logout" onClick={() => { handleLogOut() }}>Logout</button>
                            <div className='leader-board'>
                                <h1>Leaderboard</h1>
                                {allUsers &&
                                    allUsers.map((User) => {
                                        return (
                                            <UserView key={User?.email} User={User} />
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