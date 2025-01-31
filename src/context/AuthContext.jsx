import {createContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [decodedToken, setDecodedToken] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState({
        loggedIn: false,
        user: {
            username: "",
            info: "",
        }
    })
    const navigate = useNavigate();
    const [registerError, setRegisterError] = useState("");
    const [loginError, setLoginError] = useState("");

    function loginUser(loginInput) {
        console.log(loginInput);
        async function checkLoginUser() {
            setLoginError("")
            try {
                const response = await axios.post("https://api.datavortex.nl/spellbook/users/authenticate", {
                    "username": loginInput.username,
                    "password": loginInput.password,
                });
                console.log(response);
                const token = response.data.jwt;
                localStorage.setItem("authToken", token)
                setIsLoggedIn(prevState => ({
                    ...prevState,
                    loggedIn: true,
                    user: {
                        username: loginInput.username,
                    }
                }));
            } catch(e) {
                console.error(e);
                setLoginError("User not found");
            }
        }
        checkLoginUser();
    }

    function logoutUser() {
        navigate("/");
        setIsLoggedIn({
            loggedIn: false,
            user: {
                username: "",
                email: "",
            }
        })

    }

    function registerUser(registerInput) {
        async function registerNewUser() {
            setRegisterError(false);
            try {
                const response = await axios.post("https://api.datavortex.nl/spellbook/users", {
                        "username": registerInput.username,
                        "password": registerInput.password,
                        "email": registerInput.email,
                        "info": "",
                        "authorities": [
                            {
                                "authority": "USER"
                            }
                        ]
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                            "X-Api-Key": import.meta.env.VITE_API_KEY
                        }
                    }
                );
                console.log(response);
                setIsLoggedIn(prevState => ({
                    ...prevState,
                    isLoggedIn: true,
                    user: {
                        username: response.data.username,
                        email: response.data.email,
                    }
                }));
            } catch (e) {
                console.error(e);
                setRegisterError("User already exists");
            }
        }
        registerNewUser();

    }

    return (
        <AuthContext.Provider value={{
            isLoggedIn: isLoggedIn.loggedIn,
            userEmail: isLoggedIn.user.email,
            userUsername: isLoggedIn.user.username,
            loginUser: loginUser,
            logoutUser: logoutUser,
            registerUser: registerUser,
            registerError: registerError,
            loginError: loginError,
        }
        }>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;