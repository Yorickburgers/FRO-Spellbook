import './Home.css';
import Button from "../../components/button/Button.jsx";

function Home() {
return (
    <div className="page-container">
        <div className="outer-container">
            <span className="logo-wrapper-large">
            </span>
            <div className="inner-container">
                <h1>Welcome to Spellbook!</h1>
                <p>Spellbook is an application that enables you to look up spells for your Dungeons & Dragons
                    character. You can use it to:
                    <ul>
                        <li>Look up every spell available.</li>
                        <li>Filter for class or damage type.</li>
                        <li>Search for a specific spell.</li>
                        <li>Save your favourites for future reference.</li>
                    </ul>
                    Please read the descriptions below for more details and get started!
                </p>
            </div>
        </div>
        <div className="outer-container">
            <article className="function-box">

            </article>
            <article className="function-box">

            </article>
            <article className="function-box">

            </article>
        </div>
    </div>
);
}

export default Home;