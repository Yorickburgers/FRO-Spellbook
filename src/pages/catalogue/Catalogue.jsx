import './Catalogue.css';
import SortButton from "../../components/sortButton/SortButton.jsx";
import CatalogueItem from "../../components/catalogueItem/CatalogueItem.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import CollapsableListItem from "../../components/collapsableListItem/CollapsableListItem.jsx";
import FilterOption from "../../components/filterOption/FilterOption.jsx";
import RangeSlider from "../../components/rangeSlider/RangeSlider.jsx";

function Catalogue() {
    const [spells, setSpells] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const controller = new AbortController();

        async function getSpells() {
            try {
                const response = await axios.get("https://www.dnd5eapi.co/api/spells", {
                    signal: controller.signal,
                });
                setSpells(response.data.results);
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false);
            }
        }

        getSpells();

        return function cleanup() {
            controller.abort();
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <main className="page-container">
            <h1 className="page-title">Catalogue</h1>
            <div className="spell-outer-container">
                <section className="filters-container"><h2>Filters</h2>
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
                            name="damage-type">
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
                <div className="catalogue">
                    <div className="sorting-tags-container">
                        <SortButton
                            text="Name"
                            sortStyle="null"
                            className="catalogue-name"
                        />
                        <SortButton
                            text="Class"
                            sortStyle="null"
                            className="catalogue-classes"
                        />
                        <SortButton
                            text="Dam/Heal"
                            sortStyle="null"
                            className="catalogue-damage"
                        />
                        <SortButton
                            text="Type"
                            sortStyle="null"
                            className="catalogue-type"
                        />
                        <SortButton
                            text="Casting Time"
                            sortStyle="null"
                            className="catalogue-cast"
                        />
                        <SortButton
                            text="Range"
                            sortStyle="null"
                            className="catalogue-range"
                        />
                    </div>
                    <ul className="catalogue-list">
                        {spells.map((spell) => (
                            <CatalogueItem
                                name={spell.name}
                                index={spell.index}
                                url={spell.url}
                                key={spell.index}
                            />
                        ))}
                    </ul>
                </div>
                <div></div>
            </div>
        </main>
    );
}

export default Catalogue;