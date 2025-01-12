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
                <p>intro
                    <ul>
                        <li>function1</li>
                        <li>function2</li>
                        <li>function3</li>
                        <li>function4</li>
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