import './Navigation.css';
import logo from "/src/assets/spellbook-logo.png";
import {NavLink, useNavigate} from "react-router-dom";
import Button from "../button/Button.jsx";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import handleFocus from "../../helpers/handleFocus.js";
import handleBlur from "../../helpers/handleBlur.js";
import {AuthContext} from "../../context/AuthContext.jsx";

function Navigation() {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");
    const [allSpells, setAllSpells] = useState([]);
    const [filteredSpells, setFilteredSpells] = useState([]);
    const [loading, setLoading] = useState(true);
    const [inputFocused, setInputFocused] = useState(false);
    const {isLoggedIn, userUsername, logoutUser} = useContext(AuthContext);

    useEffect(() => {
        const controller = new AbortController();

        async function getSpells() {
            try {
                const response = await axios.get(`https://www.dnd5eapi.co/api/spells`, {
                    signal: controller.signal,
                });
                setAllSpells(response.data.results);
            } catch (e) {
                if (e.name !== "CanceledError") {
                    console.error(e);
                }
            } finally {
                setLoading(false);
            }
        }

        getSpells();

        return function cleanup() {
            controller.abort();
        }
    }, []);

    useEffect(() => {
        if (searchValue) {
            const filtered = allSpells.filter(spell =>
                spell.name.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredSpells(filtered);
        } else {
            setFilteredSpells([]);
        }
    }, [searchValue, allSpells]);

    function searchHandler(e) {
        setSearchValue(e.target.value);
    }

    function handleSuggestionClick(spell) {
        setSearchValue(spell.name);
        navigate(`/spells/${spell.index}`);
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
            <section className="outer-nav-container center">
                <NavLink className={({ isActive }) => isActive ? "navLink active" : "navLink"} to="/">Home</NavLink>
                <NavLink className={({ isActive }) => isActive ? "navLink active" : "navLink"} to="/spells">Catalogue</NavLink>
                <NavLink className={({ isActive }) => isActive ? "navLink active" : "navLink"} to="/favourites">Favourites</NavLink>
                <input
                    placeholder='for example "wish"'
                    className="accountInput"
                    type="text"
                    name="searchTerm"
                    value={searchValue}
                    onChange={searchHandler}
                    onFocus={() => handleFocus(setInputFocused)}
                    onBlur={() => handleBlur(setInputFocused)}
                />
                <Button
                    text="Zoek"
                    link={`/spells/search/${searchValue}`}
                />
                {inputFocused && filteredSpells.length > 0 && (
                    <div className="suggestions-list">
                        {loading && <p>loading...</p>}
                        {filteredSpells.map((spell) => (
                            <div
                                key={spell.index}
                                className="suggestion-item"
                                onClick={() => handleSuggestionClick(spell)}
                            >
                                {spell.name}
                            </div>
                        ))}
                    </div>
                )}
            </section>
            <section className="outer-nav-container">
                <p className="username">{userUsername}</p>
                {isLoggedIn
                    ? <button
                        className="button logout"
                        type="button" onClick={logoutUser}
                    >Logout
                    </button>
                    : <NavLink
                        className={({ isActive }) => isActive ? "navLink-account active" : "navLink-account"}
                        to="/account"
                    >Login
                    </NavLink>}
            </section>
        </nav>
    );
}

export default Navigation;