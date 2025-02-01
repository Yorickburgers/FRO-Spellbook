import './Account.css';
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";

function Account() {
    const {loginUser, registerUser, registerError, loginError, registerComment} = useContext(AuthContext);
    const [loginInput, setLoginInput] = useState({
        username: "",
        password: "",
    });
    const [registerInput, setRegisterInput] = useState({
        email: "",
        username: "",
        password: "",
        confirm: "",
    });
    const [passwordError, setPasswordError] = useState("");

    function handleLoginChange(e) {
        const {name, value} = e.target;
        setLoginInput((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    function handleRegisterChange(e) {
        const {name, value} = e.target;
        setRegisterInput((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    function handleLoginSubmit(e) {
        e.preventDefault();
        loginUser(loginInput);
    }

    function handleRegisterSubmit(e) {
        e.preventDefault();
        registerUser(registerInput);
    }

    useEffect(() => {
        registerInput.password !== registerInput.confirm && registerInput.confirm !== "" && setPasswordError("passwords don't match, try again");
        registerInput.password === registerInput.confirm && setPasswordError("");
    }, [registerInput]);

    return (

        <main className="page-container">
            <h1 className="page-title">Account</h1>
            <div className="account-outer-container">
                <section className="account-inner-container">
                    <h2 className="section-title">Login</h2>
                    <form className="account-form" onSubmit={(e) => handleLoginSubmit(e)}>
                        <label className="account-label" htmlFor="login-username">Username:
                            <input type="text" className="accountInput" id="login-username" name="username"
                                   onChange={handleLoginChange} value={loginInput.username}/>
                        </label>
                        <label className="account-label" htmlFor="login-password">Password:
                            <input type="password" className="accountInput" id="login-password" name="password"
                                   onChange={handleLoginChange} value={loginInput.password}/>
                        </label>
                        <h3 className="register-message">{registerComment || "Don't have an account? Register a new one!"}</h3>
                        <button type="submit" className="button">
                            <h2>Login</h2>
                        </button>

                    </form>
                    <div className="account-error">
                        {loginError && <p>{loginError}</p>}
                    </div>
                </section>
                <div className="separation"></div>
                <section className="account-inner-container">
                    <h2 className="section-title">Register</h2>
                    <form className="account-form" onSubmit={(e) => handleRegisterSubmit(e)}>
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
                                disabled={registerInput.password !== registerInput.confirm}>
                            <h2>Register</h2>
                        </button>
                    </form>
                    <div className="account-error">
                        {passwordError && <p>{passwordError}</p>}
                        {registerError && <p>{registerError}</p>}
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Account;