import './HideTab.css';
import {handleTab} from "../../helpers/handleTab.js";
import HideOption from "../hideOption/HideOption.jsx";

function HideTab({tabOpen, setTabOpen, hidden, toggleHidden}) {
function resetHidden() {
    toggleHidden({
        level: false,
        duration: false,
        components: false,
        classes: false,
        "casting time": false,
        range: false,
        attack: false,
        dc: false,
        healing: false,
        damage: false,
    });
}

    return (
    <>
        <section className={`hide-container${tabOpen ? " open" : ""}`}>
            <h2>Hide attributes
                <button type="button" className="button reset-button" onClick={resetHidden}>Reset</button>
            </h2>

            <button type="button" className="tab-button" onClick={() => handleTab(setTabOpen)}>
                Hide
            </button>
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