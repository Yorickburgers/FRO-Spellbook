import './Account.css';

function Account() {
return (
<main className="page-container">
    <h1 className="page-title">Account</h1>
    <div className="account-outer-container">
        <section className="account-inner-container">
            <h2>Login</h2>
            <label className="account-label" htmlFor="login-username">Username:
                <input type="text" className="accountInput"/>
            </label>
            <label className="account-label" htmlFor="login-password">Password:
                <input type="text" className="accountInput"/>
            </label>
            <h3>Don't have an account? Register a new one! </h3>
            <button type="button" className="button"><h2>Login</h2></button>
        </section>
        <div className="separation"></div>
        <section className="account-inner-container">
            <h2>Register</h2>
            <label className="account-label" htmlFor="register-username">Username
                <input type="text" id="register-username" className="accountInput"/>
            </label>
            <label className="account-label" htmlFor="register-password">Password
                <input type="text" id="register-password" className="accountInput"/>
            </label>
            <label className="account-label" htmlFor="confirm">Confirm password
                <input type="text" id="confirm" className="accountInput"/>
            </label>
            <button type="button" className="button"><h2>Register</h2></button>
        </section>
    </div>
</main>
);
}

export default Account;