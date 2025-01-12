import './Navigation.css';
import logo from "../../../public/vite.svg"

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
            <p>Home</p>
            <p>All spells</p>
            <p>Favourites</p>
            <input placeholder='for example "wish"' type="text" name="searchTerm"/>
            <button
                type="button"
            >zoek </button>
        </div>
        <div className="outer-nav-container">
            <div className="input-container">
                <input type="text" name="userName" placeholder="Username"/>
                <input type="text" name="password" placeholder="Password"/>
            </div>
            <button
                type="text"
            >login</button>
        </div>
    </nav>
);
}

export default Navigation;