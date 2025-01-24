import './CollapsableListItem.css';
import {useState} from "react";

function CollapsableListItem({name, children}) {
const [isActive, setIsActive] = useState(false);
const toggleCollapse = () => setIsActive(!isActive);
const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

    return (
    <>
        <li className="filter-list-item">
            <label htmlFor={name}>
                <button
                className="filter-collapse-button"
                type="button"
                name={name}
                onClick={toggleCollapse}
                >{isActive ? "-" : "+"}</button>
                {capitalizedName}
            </label>
        </li>
        <ul className={`filter-content ${isActive ? 'active' : ''}`}>
            {children}
        </ul>
    </>
);
}

export default CollapsableListItem;