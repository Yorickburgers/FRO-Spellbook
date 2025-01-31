import {createContext, useState} from "react";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [isLoggedIn, setIsLoggedIn] = useState({
        loggedIn: false,
        user: {
            username: "",
            email: "",
            info: "",
        }
    })

    function loginUser(username) {
        setIsLoggedIn({
            ...isLoggedIn,
            loggedIn: true,
            user: {
                username: username,
            }
        })
    }

    function logoutUser() {
        setIsLoggedIn({
            loggedIn: false,
            user: {
                username: "",
                email: "",
            }
        })
    }

    function registerUser() {

    }

    return (
        <AuthContext.Provider value={{
            isLoggedIn: isLoggedIn.loggedIn,
            userEmail: isLoggedIn.user.email,
            userUsername: isLoggedIn.user.username,
            loginUser: loginUser,
            logoutUser: logoutUser,
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;