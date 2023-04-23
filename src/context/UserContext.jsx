import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";

export const UserContext = createContext();
export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({})
  const [user, setUser] = useState({})
  const [err, setErr] = useState("")
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user1) => {
      setCurrentUser(user1)
      const getUserData = async () => {
        const q = query(collection(db, "users"), where("uid", "==", user1?.uid));
        try {
          const querySnapshot = await getDocs(q);
          if (querySnapshot.empty) { setUser(null) }
          let setuser = {};
          querySnapshot.forEach((doc) => {
            setuser = doc.data();
          });
          setUser(setuser)
        } catch (err){
          setErr("something Went Wrong")
        }
      };
      user1?.uid && getUserData();
    })
    return () => {
      unSub()
    }
  }, [currentUser]);

  useEffect(() => {
    const getUserData = async () => {
      await updateDoc(doc(db, "users", currentUser?.uid), {
        maxScore:user?.maxScore,
        matchPlayed:user?.matchPlayed,
        winGames:user?.winGames
      })
    }
    user && getUserData();
  }, [user])

  return (
    <UserContext.Provider value={{ currentUser, user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}