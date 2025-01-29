import './HideTab.css';
import {handleTab} from "../../helpers/handleTab.js";
import HideOption from "../hideOption/HideOption.jsx";

function HideTab({tabOpen, setTabOpen, hidden, toggleHidden}) {
return (
    <>
        <section className={`hide-container${tabOpen ? " open" : ""}`}>
            <h2>Display</h2>
            <button type="button" className="tab-button" onClick={() => handleTab(setTabOpen)}>Display</button>
            <ul className="hide-details">
                {Object.keys(hidden).map((category) => (
                        <HideOption
                            key={category}
                            category={category}
                            toggleHidden={toggleHidden}
                            hidden={hidden}
                        />
                    ))}
            </ul>
        </section>
    </>
);
}

export default HideTab;
