import './Account.css';
import {useEffect, useState} from "react";

function Account() {
    const [loginInput, setLoginInput] = useState({
        username: "",
        password: "",
    });
    const [registerInput, setRegisterInput] = useState({
        username: "",
        password: "",
        confirm: "",
    })
    const [registerError, setRegisterError] = useState("");
    const [loginError, setLoginError] = useState("");

    function handleLoginChange(e) {
        setLoginInput(e.target.value);
    }

    function handleRegisterChange(e) {
        const {name, value} = e.target;
        setRegisterInput((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    useEffect(() => {
        registerInput.password !== registerInput.confirm && registerInput.confirm !== "" && setRegisterError( "passwords don't match, try again");
        registerInput.password === registerInput.confirm && setRegisterError("");
    }, [registerInput]);

    function logInput() {
        console.log(registerInput);
    }

    return (
        <main className="page-container">
            <h1 className="page-title">Account</h1>
            <div className="account-outer-container">
                <section className="account-inner-container">
                    <h2 className="section-title">Login</h2>
                    <form className="account-form">
                        <label className="account-label" htmlFor="login-username">Username:
                            <input type="text" className="accountInput" id="login-username" name="username" onChange={handleLoginChange}/>
                        </label>
                        <label className="account-label" htmlFor="login-password">Password:
                            <input type="password" className="accountInput" id="login-password" name="password" onChange={handleLoginChange}/>
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
                        <label className="account-label" htmlFor="register-username">Username:
                            <input type="text" id="register-username" name="username" className="accountInput" onChange={handleRegisterChange} value={registerInput.username}/>
                        </label>
                        <label className="account-label" htmlFor="register-password">Password:
                            <input type="password" id="register-password" name="password" className="accountInput" onChange={handleRegisterChange} value={registerInput.password}/>
                        </label>
                        <label className="account-label" htmlFor="confirm">Confirm password:
                            <input type="password" id="confirm" name="confirm" className="accountInput" onChange={handleRegisterChange} value={registerInput.confirm}/>
                        </label>
                        <button type="submit" className={`button ${registerInput.password !== registerInput.confirm ? " disabled" : ""}`}  disabled={registerInput.password !== registerInput.confirm} onClick={logInput}>
                            <h2>Register</h2>
                        </button>
                    </form>
                    <p className="account-error">{registerError}</p>
                </section>
            </div>
        </main>
    );
}

export default Account;