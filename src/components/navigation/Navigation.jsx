import './Navigation.css';
import logo from "../../../public/assets/spellbook-logo.png"
import {NavLink, useNavigate} from "react-router-dom";
import Button from "../button/Button.jsx";

function Navigation() {
    const navigate = useNavigate();

    function clickHandler(e, link) {
        e.preventDefault();
        navigate(link);
    }

    return (
        <nav>
            <div className="outer-nav-container">
            <span className="logo-wrapper">
                <a href="/">
                    <img src={logo} alt="spellbook icon"/>
                    <h1 className="logoName">Spellbook</h1>
                </a>
            </span>
            </div>
            <div className="outer-nav-container">
                <NavLink className="navLink" to="/">Home</NavLink>
                <NavLink className="navLink" to="/spells">All spells</NavLink>
                <NavLink className="navLink" to="/favourites">Favourites</NavLink>
                <input placeholder='for example "wish"' className="accountInput" type="text" name="searchTerm"/>
                <Button
                    text="Zoek"
                    link="/spells"
                />
            </div>
            <div className="outer-nav-container">
                <NavLink className="navLink-account" to="/login">Login</NavLink>
            </div>
        </nav>
    );
}

export default Navigation;