import './Catalogue.css';
import SortButton from "../../components/sortButton/SortButton.jsx";
import CatalogueItem from "../../components/catalogueItem/CatalogueItem.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import FilterTab from "../../components/filterTab/FilterTab.jsx";

function Catalogue() {
    const [spells, setSpells] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tabOpen, setTabOpen] = useState(false);
    const [filters, toggleFilters] = useState({
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
        components: {
            "exclude Verbal": false,
            "exclude Somatic": false,
            "exclude Material": false,
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
        includes: ""
    })
    const [renderedSpells, setRenderedSpells] = useState([]);



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

    const handleSpellDetails = (spellDetails) => {
        setRenderedSpells((prevState) => {
            if (Object.keys(spellDetails).length === 0) {
                return prevState;
            }
            if (!prevState.some((spell) => spell.index === spellDetails.index)) {
                return [...prevState, spellDetails];
            }
            return prevState;
        });
    };

    useEffect(() => {
        console.log(renderedSpells);
    }, [renderedSpells]);

    useEffect(() => {
        setRenderedSpells([]);
    }, [filters]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <main className="page-container catalogue-container">
            <h1 className="page-title">Catalogue</h1>
            <div className="spell-outer-container">
                <FilterTab
                tabOpen={tabOpen}
                setTabOpen={setTabOpen}
                filters={filters}
                toggleFilters={toggleFilters}/>
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
                                filters={filters}
                                handleSpellDetails={handleSpellDetails}
                            />
                        ))}
                    </ul>
                </div>
                <div className={`position-dummy ${tabOpen ? "open" : ""}`}></div>
            </div>
        </main>
    );
}

export default Catalogue;