import './HideTab.css';
import {handleTab} from "../../helpers/handleTab.js";

function HideTab({tabOpen, setTabOpen, hidden, setHidden}) {
return (
    <>
        <section className={`filters-container${tabOpen ? " open" : ""}`}>
            <h2>Filters</h2>
            <button type="button" className="tab-button" onClick={() => handleTab(setTabOpen)}>Filters</button>
            <ul className="filters">


                <li className="filter-list-item"><label htmlFor="includes-input">Includes: <input
                    className="accountInput" name="includes-input" type="text" value={null} onChange={null}/></label></li>
            </ul>
        </section>
    </>
);
}

export default HideTab;