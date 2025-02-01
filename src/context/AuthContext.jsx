import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [isLoggedIn, setIsLoggedIn] = useState({
        loggedIn: false,
        user: {
            username: "",
            info: "",
        },
        status: "pending",
    })
    const navigate = useNavigate();
    const [registerError, setRegisterError] = useState("");
    const [loginError, setLoginError] = useState("");
    const [registerComment, setRegisterComment] = useState("")

    function loginUser(loginInput) {
        async function checkLoginUser() {
            setLoginError("")
            try {
                const response = await axios.post("https://api.datavortex.nl/spellbook/users/authenticate", {
                    "username": loginInput.username,
                    "password": loginInput.password,
                });
                const token = response.data.jwt;
                localStorage.setItem("authToken", token)
                setIsLoggedIn(prevState => ({
                    ...prevState,
                    loggedIn: true,
                    user: {
                        username: loginInput.username,
                    }
                }));
                navigate("/");
            } catch (e) {
                console.error(e);
                setLoginError("User not found");
                setIsLoggedIn(prevState => ({
                    ...prevState,
                    status: "done"
                }))
            }
        }

        checkLoginUser();
    }

    function logoutUser() {
        navigate("/");
        setIsLoggedIn({
            ...isLoggedIn,
            loggedIn: false,
            user: {
                username: "",
                info: "",
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
        const controller = new AbortController();
        const token = localStorage.getItem("authToken");
        const decoded = jwtDecode(token);
        const expDate = decoded.exp;
        const currentDate = Math.floor(Date.now() / 1000);
        if (expDate >= currentDate) {
            async function retrieveUserInfo() {
                try {
                    const response = await axios.get(`https://api.datavortex.nl/spellbook/users/${decoded.sub}`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                        signal: controller.signal,
                    })
                    console.log(response);
                    setIsLoggedIn({
                        loggedIn: true,
                        user: {
                            username: response.data.username,
                            info: response.data.info,
                        },
                        status: "done",
                    })
                } catch (e) {
                    console.error(e);
                }
            }

            retrieveUserInfo();
            setIsLoggedIn({
                ...isLoggedIn,
                status: "done",
            })
        } else {
            setIsLoggedIn({
                ...isLoggedIn,
                status: "done",
            });
        }

        return function cleanup() {
            controller.abort();
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            isLoggedIn: isLoggedIn.loggedIn,
            userUsername: isLoggedIn.user.username,
            loginUser: loginUser,
            logoutUser: logoutUser,
            registerUser: registerUser,
            registerError: registerError,
            loginError: loginError,
            registerComment: registerComment,
        }
        }>
            {isLoggedIn.status === "done" && children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;