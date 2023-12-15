import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import {  db } from "../firebase";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";

export const ScoreContext = createContext();
export const ScoreContextProvider = ({ children }) => {
    const { currentUser,user } = useContext(UserContext)
    const [score, setScore] = useState(0);
    const [unlock, setUnlock] = useState(1);
    const [foundEle, setFoundEle] = useState([]);
    const [ stage, setStage ] = useState("stages");
    const [ num, setNum ] = useState(0);
    const [ lastGame, setLastGame ] = useState();

    useEffect(() => {
        const getUserData = async () => {
            const q = query(collection(db, "lastGame"), where("uid", "==", currentUser?.uid));
            try {
                const querySnapshot = await getDocs(q);
                if (querySnapshot.empty) { console.log("empty"); setLastGame({}); }
                let setuser = {};
                querySnapshot.forEach((doc) => {
                    setuser = doc.data();
                });
                if(!setuser) return; 
                setLastGame(setuser)
                setScore(setuser.score)
                setUnlock(setuser.unlock)
                setStage(setuser.stage)
                setFoundEle(setuser.foundEle)
                setNum(setuser.num)
            } catch (err) {
                console.log(err)
            }
        };
        currentUser?.uid && getUserData();
    }, [currentUser,user])
    useEffect(() => {
        const getUserData = async () => {
            await updateDoc(doc(db, "lastGame", currentUser?.uid), {
                foundEle:lastGame.foundEle,
                num:lastGame.num,
                score:lastGame.score,
                stage:lastGame.stage,
                unlock:lastGame.unlock,
            }) 
        }
        lastGame && getUserData();
    }, [lastGame])

    useEffect(()=>{
      setLastGame({...lastGame,score:score,unlock:unlock,foundEle:foundEle,stage:stage,num:num});
    },[unlock,score,foundEle,stage,num])
    return (
        <ScoreContext.Provider value={{ score, setScore, unlock, setUnlock,foundEle,setFoundEle,stage,setStage,num,setNum,lastGame, setLastGame }}>
            {children}
        </ScoreContext.Provider>
    )
}