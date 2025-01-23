import './Navigation.css';
import logo from "/src/assets/spellbook-logo.png";
import {NavLink, useNavigate} from "react-router-dom";
import Button from "../button/Button.jsx";
import {useEffect, useState} from "react";

function Navigation() {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");

    function clickHandler(e, link) {
        e.preventDefault();
        navigate(link);
    }

    function searchHandler(e) {
        setSearchValue(e.target.value);
    }

    function handleSearchClick() {
        if (searchValue) {
            navigate()
        }
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
                <NavLink className="navLink" to="/spells">Catalogue</NavLink>
                <NavLink className="navLink" to="/favourites">Favourites</NavLink>
                <input placeholder='for example "wish"' className="accountInput" type="text" name="searchTerm" value={searchValue} onChange={searchHandler}/>
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