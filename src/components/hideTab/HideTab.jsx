import './HideTab.css';
import {handleTab} from "../../helpers/handleTab.js";

function HideTab({tabOpen, setTabOpen, hidden, setHidden}) {
return (
    <>
        <section className={`hide-container${tabOpen ? " open" : ""}`}>
            <h2>Hide Details</h2>
            <button type="button" className="tab-button" onClick={() => handleTab(setTabOpen)}>Filters</button>
            <ul className="hide-details">
                <li className="x"></li>
            </ul>
        </section>
    </>
);
}

export default HideTab;