import './Home.css';
import Button from "../../components/button/Button.jsx";
import logo from "/src/assets/spellbook-logo.png";

function Home() {
    return (
        <main className="page-container">
            <div className="outer-container">
            <span className="logo-wrapper-large">
                <img src={logo} alt="spellbook logo"/>
            </span>
                <div className="home-inner-container">
                    <h1>Welcome to Spellbook!</h1>
                    <p>Spellbook is an application that enables you to look up spells for your Dungeons & Dragons
                        character. You can use it to:</p>
                    <ul>
                        <li>Look up every spell available.</li>
                        <li>Filter for class or damage type.</li>
                        <li>Search for a specific spell.</li>
                        <li>Save your favourites for future reference.</li>
                    </ul>
                    <p>Please read the descriptions below for more details and get started!</p>
                </div>
            </div>
            <div className="outer-container">
                <article className="function-box">
                    <h2>Spell list</h2>
                    <p>See a complete list of all spells available in DnD 5.5e. Filter for class, damage type or other
                        criteria and see all spells that meet your criteria. Click on any spell to see its details.</p>
                    <Button
                        text="All spells"
                        link="/spells"
                    />
                </article>
                <article className="function-box">
                    <h2>Search a spell</h2>
                    <p>Have you read about an amazing new spell, or is someone at your table casting a spell that you
                        forgot
                        the details about? Look for it here by typing the spell name or a keyword.</p>
                    <div><input placeholder='for example "wish"' className="accountInput" type="text"
                                name="searchTerm"/>
                        <Button
                            text="Search"
                            link="/spells"
                        /></div>
                </article>
                <article className="function-box">
                    <h2>Favourites</h2>
                    <p>When browsing the complete spell list and specific spells, you can add spells that you like to
                        your
                        favourites list by pressing the star. Click here to see a list of your favourite spells.</p>
                    <Button
                        text="Favourites"
                        link="/favourites"
                    />
                </article>
            </div>
        </main>
    );
}

export default Home;