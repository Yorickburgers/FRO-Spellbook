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
            excludeVerbal: false,
            excludeSomatic: false,
            excludeMaterial: false,
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
            bonusAction: false,
            reaction: false,
            timed: false,
        },
        range: {
            min: 0,
            max: 300,
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
    const [filteredSpells, setFilteredSpells] = useState([]);



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

    useEffect(() => {
        const isCategoryFiltered = (category, filters) => Object.values(filters[category]).includes(true);

        const filterSpells = (spells, filters) => {
            return spells.filter(spell => {
                const levelMatch = !isCategoryFiltered("level", filters) || filters.level[spell.level] || false;
                const typeMatch = !isCategoryFiltered("type", filters) || filters.type[spell?.damage?.damage_type?.name.toLowerCase()] || false;
                const classMatch = !isCategoryFiltered("classes", filters) || spell.classes?.some(cls => filters.classes[cls.name.toLowerCase()]) || false;
                const attackMatch = !isCategoryFiltered("attack", filters) || filters.attack[spell.attack_type] || false;
                const rangeMatch = !filters.range || (spell.range >= filters.range.min && spell.range <= filters.range.max);
                const dcTypeMatch = !isCategoryFiltered("dcType", filters) || filters.dcType[spell?.dc.dc_type.index] || false;

                return levelMatch && dcTypeMatch;
            });
        };

        if (!loading) {
            const newFilteredSpells = filterSpells(spells, filters);
            setFilteredSpells(newFilteredSpells);
        }

        console.log(filters);
    }, [spells, filters, loading]);



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
                        {filteredSpells.map((spell) => (
                            <CatalogueItem
                                name={spell.name}
                                index={spell.index}
                                url={spell.url}
                                key={spell.index}
                                filters={filters}
                            />
                        ))}
                        {filteredSpells.length<1 && <p>No spells match your chosen filters...</p>}
                    </ul>
                </div>
                <div className={`position-dummy ${tabOpen ? "open" : ""}`}></div>
            </div>
        </main>
    );
}

export default Catalogue;