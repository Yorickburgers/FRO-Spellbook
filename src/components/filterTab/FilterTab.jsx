import './FilterTab.css';
import {handleTab} from "../../helpers/handleTab.js";
import CollapsableListItem from "../collapsableListItem/CollapsableListItem.jsx";
import FilterOption from "../filterOption/FilterOption.jsx";

function FilterTab({tabOpen, setTabOpen, filters, toggleFilters}) {
    function handleChange(e) {
        e.preventDefault();
        toggleFilters({
            ...filters,
            includes: e.target.value,
        });
    }

    function resetFilters() {
        toggleFilters({
            level: {
                0: false,
                1: false,
                2: false,
                3: false,
                4: false,
                5: false,
                6: false,
                7: false,
                8: false,
                9: false,
            },
            type: {
                acid: false,
                bludgeoning: false,
                cold: false,
                fire: false,
                force: false,
                healing: false,
                lightning: false,
                necrotic: false,
                piercing: false,
                poison: false,
                psychic: false,
                radiant: false,
                slashing: false,
                thunder: false,
            },
            classes: {
                bard: false,
                cleric: false,
                druid: false,
                paladin: false,
                ranger: false,
                sorcerer: false,
                warlock: false,
                wizard: false,
            },
            castTime: {
                action: false,
                "bonus action": false,
                timed: false,
                reaction: false,
            },
            range: {
                touch: false,
                self: false,
                "10 feet": false,
                "30 feet": false,
                "60 feet": false,
                "90 feet": false,
                "120 feet": false,
                "300 feet": false,
                "1 mile": false,
            },
            attack: {
                melee: false,
                ranged: false,
            },
            dcType: {
                cha: false,
                con: false,
                dex: false,
                int: false,
                str: false,
                wis: false,
            },
            includes: "",
        });
    }

    return (
        <>
            <section className={`filters-container${tabOpen ? " open" : ""}`}>
                <h2>Filters
                    <button type="button" className="button reset-button" onClick={resetFilters}>Reset</button>
                </h2>
                <button type="button" className="tab-button" onClick={() => handleTab(setTabOpen)}>
                    Filters
                </button>

                <ul className="filters">
                <CollapsableListItem
                        name="level">
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(level => (
                            <FilterOption
                                key={level}
                                type="checkbox"
                                option={level}
                                category="level"
                                filters={filters}
                                toggleFilters={toggleFilters}
                            />
                        ))}
                    </CollapsableListItem>
                    <CollapsableListItem name="type">
                        {["acid", "bludgeoning", "cold", "fire", "force", "healing", "lightning", "necrotic", "piercing", "poison", "psychic", "radiant", "slashing", "thunder"].map(type => (
                            <FilterOption
                                key={type}
                                type="checkbox"
                                option={type}
                                category="type"
                                filters={filters}
                                toggleFilters={toggleFilters}
                            />
                        ))}
                    </CollapsableListItem>
                    <CollapsableListItem name="classes">
                        {["bard", "cleric", "druid", "paladin", "ranger", "sorcerer", "warlock", "wizard"].map(charClass => (
                            <FilterOption
                                key={charClass}
                                type="checkbox"
                                option={charClass}
                                category="classes"
                                filters={filters}
                                toggleFilters={toggleFilters}
                            />
                        ))}
                    </CollapsableListItem>
                    <CollapsableListItem name="casting time">
                        {["action", "bonus action", "reaction", "timed"].map(time => (
                            <FilterOption
                                key={time}
                                type="checkbox"
                                option={time}
                                category="castTime"
                                filters={filters}
                                toggleFilters={toggleFilters}
                            />
                        ))}
                    </CollapsableListItem>
                    <CollapsableListItem name="range">
                        {["touch", "self", "10 feet", "30 feet", "60 feet", "90 feet", "120 feet", "300 feet", "1 mile"].map(range => (
                            <FilterOption
                                key={range}
                                type="checkbox"
                                option={range}
                                category="range"
                                filters={filters}
                                toggleFilters={toggleFilters}
                            />
                        ))}
                    </CollapsableListItem>
                    <CollapsableListItem name="attack">
                        {["ranged", "melee"].map(attack => (
                            <FilterOption
                                key={attack}
                                type="checkbox"
                                option={attack}
                                category="attack"
                                filters={filters}
                                toggleFilters={toggleFilters}
                            />
                        ))}
                    </CollapsableListItem>
                    <CollapsableListItem name="dc-type">
                        {["cha", "con", "dex", "int", "str", "wis"].map(attribute => (
                            <FilterOption
                                key={attribute}
                                type="checkbox"
                                option={attribute}
                                category="dcType"
                                filters={filters}
                                toggleFilters={toggleFilters}
                            />
                        ))}
                    </CollapsableListItem>

                    <li className="filter-list-item"><label htmlFor="includes-input">Includes: <input
                        className="accountInput" name="includes-input" type="text" value={filters.includes}
                        onChange={handleChange}/></label></li>
                </ul>
            </section>
        </>
    );
}

export default FilterTab;