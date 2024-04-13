import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();
export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [user, setUser] = useState(null)
 
  useEffect(() => {
    setUser(user);
  }, [currentUser])

  return (
    <UserContext.Provider value={{ currentUser, user, setUser,setCurrentUser}}>
      {children}
    </UserContext.Provider>
  )
}