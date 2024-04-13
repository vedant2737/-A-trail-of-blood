import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const ScoreContext = createContext();
export const ScoreContextProvider = ({ children }) => {
    const { currentUser,user,setUser } = useContext(UserContext)
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [foundEle, setFoundEle] = useState([]);
    const [ stage, setStage ] = useState("stages");
    const [ num, setNum ] = useState(0);
    const [ maxScore, setMaxScore ] = useState(0);
    const [ matchPlayed, setMatchPlayed ] = useState(0);
    const [ totalCoins, setTotalCoins ] = useState(0);
    const [ winGames, setWinGames ] = useState(0);

    useEffect(() => {
            if(currentUser){
                setScore(currentUser.score)
                setLevel(currentUser.level)
                setStage(currentUser.stage)
                setFoundEle(currentUser.foundEle)
                setNum(currentUser.num)
                setMaxScore(currentUser.maxScore)
                setMatchPlayed(currentUser.matchPlayed)
                setTotalCoins(currentUser.totalCoins)
                setWinGames(currentUser.winGames)
            }
    },[currentUser])

    useEffect(()=>{
        const updateUser = (obj)=>{
                fetch(`http://localhost:8080/users/update`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(obj),
                  })
                   .then(response => response.json())
                    .then(updatedUser => {
                        console.log('User updated successfully:', updatedUser);
                    })
                    .catch(error => {
                        console.error('Error updating user:', error);                
                    });
            
        }
        if(user){
            const obj = {...user,
                score:score,
                level:level,
                foundEle:foundEle,
                stage:stage,
                num:num,
                maxScore:maxScore,
                matchPlayed:matchPlayed,
                totalCoins:totalCoins,
                winGames:winGames
            };
                updateUser(obj);
                setUser(obj);
        }
    },[level,score,foundEle,stage,num,maxScore,matchPlayed,totalCoins,winGames])

    return (
        <ScoreContext.Provider value={{ 
            score, setScore,
            level, setLevel,
            foundEle,setFoundEle,
            stage,setStage,
            num,setNum,
            maxScore,setMaxScore,
            matchPlayed,setMatchPlayed,
            totalCoins,setTotalCoins,
            winGames,setWinGames
        }}>
            {children}
        </ScoreContext.Provider>
    )
}