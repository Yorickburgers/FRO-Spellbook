import {createContext, useState} from "react";
export const AuthContext = createContext(null);

function AuthContextProvider({children}) {
    const [isLoggedIn, setIsLoggedIn] = useState({
        loggedIn: false,
        user: {
            username: "",
            password: "",
            token: "",
        }
    })

    function registerUser() {

    }
    return (
        <AuthContext.Provider value={null}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;