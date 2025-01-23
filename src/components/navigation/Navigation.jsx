import './Navigation.css';
import logo from "/src/assets/spellbook-logo.png";
import {NavLink} from "react-router-dom";
import Button from "../button/Button.jsx";
import {useState} from "react";

function Navigation() {
    const [searchValue, setSearchValue] = useState("");

    function searchHandler(e) {
        setSearchValue(e.target.value);
    }

    return (
        <nav>
            <section className="outer-nav-container">
            <span className="logo-wrapper">
                <a href="/">
                    <img src={logo} alt="spellbook icon"/>
                    <h1 className="logoName">Spellbook</h1>
                </a>
            </span>
            </section>
            <section className="outer-nav-container">
                <NavLink className="navLink" to="/">Home</NavLink>
                <NavLink className="navLink" to="/spells">Catalogue</NavLink>
                <NavLink className="navLink" to="/favourites">Favourites</NavLink>
                <input placeholder='for example "wish"' className="accountInput" type="text" name="searchTerm" value={searchValue} onChange={searchHandler}/>
                <Button
                    text="Zoek"
                    link={`/spells/search/${searchValue}`}
                />
            </section>
            <section className="outer-nav-container">
                <NavLink className="navLink-account" to="/login">Login</NavLink>
            </section>
        </nav>
    );
}

export default Navigation;