import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from './../lib/appwrite'

const GlobalContext = createContext();

export const useGlobalContext =  () => useContext(GlobalContext);

const GlobalProvider = ({children}) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getCurrentUser()
            .then((res) => { //^ since getCurrentUser is an async we are gonna use .then
                
                
                if(res) {
                    //^ in case there is a user 
                    setIsLoggedIn(true); 
                    setUser(res);
                }else{
                    setIsLoggedIn(false)
                    setUser(null)
                }
            })
            .catch((error) => {
                console.log(error); 
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, []);
    // useEffect(() => {
    //     const fetchUser = async () => {
    //         try {
    //             const res = await getCurrentUser();
    //             if (res) {
    //                 setIsLoggedIn(true);
    //                 setUser(res);
    //             } else {
    //                 setIsLoggedIn(false);
    //                 setUser(null);
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };
    
    //     fetchUser();
    // }, []);
    
    return (
        <GlobalContext.Provider 
            value={{ 
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading,
                setIsLoading
             }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;