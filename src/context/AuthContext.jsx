import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

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
    const [registerComment, setRegisterComment] = useState("")

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
                const decoded = jwtDecode(token);
                console.log(decoded);
                setIsLoggedIn(prevState => ({
                    ...prevState,
                    loggedIn: true,
                    user: {
                        username: loginInput.username,
                    }
                }));
                // navigate("/");
            } catch (e) {
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
        localStorage.removeItem("authToken");
    }

    function registerUser(registerInput) {
        async function registerNewUser() {
            setRegisterError("");
            try {
                const response = await axios.post("https://api.datavortex.nl/spellbook/users", {
                        "username": registerInput.username,
                        "password": registerInput.password,
                        "email": registerInput.email,
                        "info": "test",
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
                setRegisterComment("Registered succesfully! Please log in.")
            } catch (e) {
                console.error(e);
                setRegisterError("User already exists");
            }
        }

        registerNewUser();

    }

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        // if (token) {
            async function retrieveUserInfo() {
                const decoded = jwtDecode(token);
                console.log(decoded);
                try {
                    const response = await axios.get(`https://api.datavortex.nl/spellbook/users/${decoded.sub}`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        }
                    })
                    console.log(response);
                    setIsLoggedIn({
                        loggedIn: true,
                        user: {
                            username: response.data.username,
                            info: response.data.info,
                        }
                    })
                } catch(e) {
                    console.error(e);
                }
            }
            retrieveUserInfo();
        // }
    }, []);

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
            registerComment: registerComment,
        }
        }>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;