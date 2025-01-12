import './Navigation.css';
import logo from "../../../public/vite.svg"
import {NavLink} from "react-router-dom";
import Button from "../button/Button.jsx";

function Navigation() {
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
            <input placeholder='for example "wish"' type="text" name="searchTerm"/>
            <Button
                text="Zoek"
                link="/spells"
            />
        </div>
        <div className="outer-nav-container">
            <div className="input-container">
                <input type="text" name="userName" placeholder="Username"/>
                <input type="text" name="password" placeholder="Password"/>
            </div>
            <Button
                text="Login"
                link="/"
            />
        </div>
    </nav>
);
}

export default Navigation;