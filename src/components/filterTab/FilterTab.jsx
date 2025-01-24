import './FilterTab.css';
import {handleTab} from "../../helpers/handleTab.js";
import CollapsableListItem from "../collapsableListItem/CollapsableListItem.jsx";
import FilterOption from "../filterOption/FilterOption.jsx";
import RangeSlider from "../rangeSlider/RangeSlider.jsx";

function FilterTab({tabOpen, setTabOpen}) {

    return (
    <>
        <section className={`filters-container${tabOpen ? " open" : ""}`}>
            <h2>Filters</h2>
            <button type="button" className="tab-button" onClick={() => handleTab(setTabOpen)}>Filters</button>
            <ul className="filters">
                <CollapsableListItem
                    name="level">
                    <FilterOption type="checkbox" option="Cantrip"/>
                    <FilterOption type="checkbox" option="1st"/>
                    <FilterOption type="checkbox" option="2nd"/>
                    <FilterOption type="checkbox" option="3rd"/>
                    <FilterOption type="checkbox" option="4th"/>
                    <FilterOption type="checkbox" option="5th"/>
                    <FilterOption type="checkbox" option="6th"/>
                    <FilterOption type="checkbox" option="7th"/>
                    <FilterOption type="checkbox" option="8th"/>
                    <FilterOption type="checkbox" option="9th"/>
                </CollapsableListItem>
                <CollapsableListItem
                    name="type">
                    <FilterOption type="checkbox" option="Acid"/>
                    <FilterOption type="checkbox" option="Bludgeoning"/>
                    <FilterOption type="checkbox" option="Cold"/>
                    <FilterOption type="checkbox" option="Fire"/>
                    <FilterOption type="checkbox" option="Force"/>
                    <FilterOption type="checkbox" option="Lightning"/>
                    <FilterOption type="checkbox" option="Necrotic"/>
                    <FilterOption type="checkbox" option="Piercing"/>
                    <FilterOption type="checkbox" option="Poison"/>
                    <FilterOption type="checkbox" option="Psychic"/>
                    <FilterOption type="checkbox" option="Radiant"/>
                    <FilterOption type="checkbox" option="Slashing"/>
                    <FilterOption type="checkbox" option="Thunder"/>
                </CollapsableListItem>
                <CollapsableListItem
                    name="components">
                    <FilterOption type="checkbox" option="Non-verbal"/>
                    <FilterOption type="checkbox" option="Not somatic"/>
                    <FilterOption type="checkbox" option="No materials"/>
                </CollapsableListItem>
                <CollapsableListItem
                    name="classes">
                    <FilterOption type="checkbox" option="Bard"/>
                    <FilterOption type="checkbox" option="Cleric"/>
                    <FilterOption type="checkbox" option="Druid"/>
                    <FilterOption type="checkbox" option="Paladin"/>
                    <FilterOption type="checkbox" option="Ranger"/>
                    <FilterOption type="checkbox" option="Sorcerer"/>
                    <FilterOption type="checkbox" option="Warlock"/>
                    <FilterOption type="checkbox" option="Wizard"/>
                </CollapsableListItem>
                <CollapsableListItem
                    name="casting-time">
                    <FilterOption type="checkbox" option="1 Action"/>
                    <FilterOption type="checkbox" option="1 Bonus Action"/>
                    <FilterOption type="checkbox" option="1 Reaction"/>
                    <FilterOption type="checkbox" option="1 minute or longer"/>
                </CollapsableListItem>
                <CollapsableListItem
                    name="range">
                    <RangeSlider/>
                </CollapsableListItem>
                <CollapsableListItem
                    name="attack">
                    <FilterOption type="checkbox" option="Ranged"/>
                    <FilterOption type="checkbox" option="Melee"/>
                </CollapsableListItem>
                <CollapsableListItem
                    name="dc-type">
                    <FilterOption type="checkbox" option="CON"/>
                    <FilterOption type="checkbox" option="STR"/>
                    <FilterOption type="checkbox" option="DEX"/>
                    <FilterOption type="checkbox" option="WIS"/>
                    <FilterOption type="checkbox" option="INT"/>
                    <FilterOption type="checkbox" option="CHA"/>
                </CollapsableListItem>

                <li className="filter-list-item"><label htmlFor="includes-input">Includes: <input
                    className="accountInput" name="includes-input" type="text"/></label></li>
            </ul>
        </section>
    </>
);
}

export default FilterTab;