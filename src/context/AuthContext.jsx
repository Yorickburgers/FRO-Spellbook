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
            password: "",
            email: "",
        },
        status: "pending",
    });
    const navigate = useNavigate();
    const [registerError, setRegisterError] = useState("");
    const [loginError, setLoginError] = useState("");
    const [registerComment, setRegisterComment] = useState("");
    const [favourites, setFavourites] = useState([]);

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
                        ...prevState.user,
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
                await axios.post("https://api.datavortex.nl/spellbook/users", {
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
                setRegisterComment("Registered succesfully! Please log in.");
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
                    setIsLoggedIn({
                        loggedIn: true,
                        user: {
                            username: response.data.username,
                            info: response.data.info,
                            password: response.data.password,
                            email: response.data.email,
                        },
                        status: "done",
                    })
                } catch (e) {
                    if (e.name !== "CanceledError") {
                        console.error(e);
                    }
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

    useEffect(() => {
        const controller = new AbortController();
        const token = localStorage.getItem("authToken");

        if (token && isLoggedIn.loggedIn && isLoggedIn.user.username) {
            async function retrieveInfo() {
                try {
                    const responseInfo = await axios.get(`https://api.datavortex.nl/spellbook/users/${isLoggedIn.user.username}/info`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                        signal: controller.signal,
                    });
                    setIsLoggedIn(prevState => ({
                        ...prevState,
                        user: {
                            ...prevState.user,
                            info: responseInfo.data,
                        }
                    }));
                } catch (e) {
                    if (e.name !== "CanceledError") {
                        console.error(e);
                    }
                }
            }

            retrieveInfo();
        }

        return function cleanup() {
            controller.abort();
        }
    }, [isLoggedIn.loggedIn, isLoggedIn.user.username]);

    useEffect(() => {

        setFavourites((isLoggedIn.user.info).split("&").filter(item => item !== "").sort());
    }, [isLoggedIn.user.info]);

    useEffect(() => {
        const controller = new AbortController();
        const token = localStorage.getItem("authToken");

        async function changeUserInfo() {
            try {
                const response = await axios.put(`https://api.datavortex.nl/spellbook/users/${isLoggedIn.user.username}`, {
                        username: isLoggedIn.user.username,
                        password: isLoggedIn.user.password,
                        email: isLoggedIn.user.email,
                        info: favourites.join("&"),
                    }
                    , {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                        signal: controller.signal,
                    }
                );
                console.log(response);
            } catch (e) {
                if (e.name !== "CanceledError") {
                    console.error(e);
                }
            }
        }

        changeUserInfo();

        return function cleanup() {
            controller.abort();
        }
    }, [favourites]);

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
            favourites: favourites,
            setFavourites: setFavourites,
        }
        }>
            {isLoggedIn.status === "done" && children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;