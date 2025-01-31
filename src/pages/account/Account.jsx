import './Account.css';
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import Button from "../../components/button/Button.jsx";

function Account() {
    const {isLoggedIn, userEmail, userUsername, loginUser, logoutUser } = useContext(AuthContext);
    const [loginInput, setLoginInput] = useState({
        username: "",
        password: "",
    });
    const [registerInput, setRegisterInput] = useState({
        email: "",
        username: "",
        password: "",
        confirm: "",
    })
    const [registerError, setRegisterError] = useState("");
    const [loginError, setLoginError] = useState("");

    function handleLoginChange(e) {
        const {name, value} = e.target;
        setLoginInput(prevState => ({
            ...prevState,
                [name]: value
        }));
    }

    function handleRegisterChange(e) {
        const {name, value} = e.target;
        setRegisterInput((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        loginUser(loginInput.username);
    }

    useEffect(() => {
        registerInput.password !== registerInput.confirm && registerInput.confirm !== "" && setRegisterError( "passwords don't match, try again");
        registerInput.password === registerInput.confirm && setRegisterError("");
    }, [registerInput]);

    function logInput() {
        console.log(registerInput);
    }

    function clickHandler(e) {
        e.preventDefault();
        console.log(isLoggedIn);
    }

        return (

        <main className="page-container">
            <h1 className="page-title">Account</h1>
            {!isLoggedIn
            ? <div className="account-outer-container">
                <section className="account-inner-container">
                    <h2 className="section-title">Login</h2>
                    <form className="account-form" onSubmit={(e) => handleSubmit(e)}>
                        <div>
                            <button onClick={clickHandler} type="button">test</button>
                        </div>
                        <label className="account-label" htmlFor="login-username">Username:
                            <input type="text" className="accountInput" id="login-username" name="username"
                                   onChange={handleLoginChange} value={loginInput.username}/>
                        </label>
                        <label className="account-label" htmlFor="login-password">Password:
                            <input type="password" className="accountInput" id="login-password" name="password"
                                   onChange={handleLoginChange} value={loginInput.password}/>
                        </label>
                        <h3 className="register-message">Don't have an account? Register a new one! </h3>
                        <button type="submit" className="button">
                            <h2>Login</h2>
                        </button>

                    </form>

                    <div className="account-error">{loginError}</div>
                </section>
                <div className="separation"></div>
                <section className="account-inner-container">
                    <h2 className="section-title">Register</h2>
                    <form className="account-form">
                        <label className="account-label" htmlFor="email">Email:
                            <input type="email" id="email" name="email" className="accountInput"
                                   onChange={handleRegisterChange} value={registerInput.email}/>
                        </label>
                        <label className="account-label" htmlFor="register-username">Username:
                            <input type="text" id="register-username" name="username" className="accountInput"
                                   onChange={handleRegisterChange} value={registerInput.username}/>
                        </label>
                        <label className="account-label" htmlFor="register-password">Password:
                            <input type="password" id="register-password" name="password" className="accountInput"
                                   onChange={handleRegisterChange} value={registerInput.password}/>
                        </label>
                        <label className="account-label" htmlFor="confirm">Confirm password:
                            <input type="password" id="confirm" name="confirm" className="accountInput"
                                   onChange={handleRegisterChange} value={registerInput.confirm}/>
                        </label>
                        <button type="submit"
                                className={`button ${registerInput.password !== registerInput.confirm ? " disabled" : ""}`}
                                disabled={registerInput.password !== registerInput.confirm} onClick={logInput}>
                            <h2>Register</h2>
                        </button>
                    </form>
                    <p className="account-error">{registerError}</p>
                </section>
            </div>
            : <div className="account-outer-container"><section className="account-inner-container">
            <h2 className="section-title">Account information</h2>
            <div className="account-information"><p>Username: {userUsername}</p>
            <p>Email: {userEmail}</p>
            <p>Favourites: <Button
                text="Favourites"
                link="/favourites"
            /></p></div>
                    <button type="button" className="button" onClick={logoutUser}>Logout</button> }

        </section></div>}
        </main>
    );
}

export default Account;