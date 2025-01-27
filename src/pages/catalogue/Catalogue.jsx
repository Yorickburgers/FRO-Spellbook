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
    const [sortedSpells, setSortedSpells] = useState([]);
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

    const sortByName = () => {
        const sorted = [...renderedSpells].sort((a, b) => a.name.localeCompare(b.name));
        setSortedSpells(sorted);
    };

    const sortByClass = (chosenClass) => {
        const sorted = [...renderedSpells].sort((a, b) => {
            const canLearnA = a.classes?.some(cls => cls.name === chosenClass);
            const canLearnB = b.classes?.some(cls => cls.name === chosenClass);

            if (canLearnA && !canLearnB) return -1;
            if (!canLearnA && canLearnB) return 1;
            return 0;
        });
        setSortedSpells(sorted);
    };

    const sortByDamageOrHealing = () => {
        const calculatePart = (part) => {
            if (part.includes("d")) {
                const [numDice, dieType] = part.split('d').map(Number);
                return numDice * dieType
            } else {
                return parseInt(part)
            }
        };

        const determineModifier = (modifier) => {
            if (modifier.toUpperCase() === "MOD") return 0;
            if (modifier.includes("d")) return calculatePart(modifier);
            const number = parseInt(modifier);
            return isNaN(number) ? 0 : number;
        };

        const calculateDamage = (spell) => {
            let dmg = null;
            if (spell?.damage) {
                dmg = spell?.damage?.damage_at_slot_level?.[spell?.level];
                if (!dmg) {
                    dmg = spell?.damage?.damage_at_character_level?.[1];
                }
            }
            if (!dmg && spell?.heal_at_slot_level) {
                dmg = spell?.heal_at_slot_level?.[spell.level];
            }
            if (!dmg) return 0;
            const [dicePart, modifierPart] = dmg.split('+').map(part => part.trim());
            const damageOrHealing = calculatePart(dicePart);
            const modifier = modifierPart ? determineModifier(modifierPart) : 0;

            return damageOrHealing + modifier;
        };

        const sorted = [...renderedSpells].sort((a, b) => calculateDamage(b) - calculateDamage(a));
        setSortedSpells(sorted);
    };

    const handleSortByType = () => {
        const sorted = [...renderedSpells].sort((a, b) => {
            const isHealingA = Object.keys(a).includes("heal_at_slot_level");
            const isHealingB = Object.keys(b).includes("heal_at_slot_level");

            if (isHealingA && isHealingB) {
                const healingA = a.heal_at_slot_level[Object.keys(a.heal_at_slot_level)[0]] || 0;
                const healingB = b.heal_at_slot_level[Object.keys(b.heal_at_slot_level)[0]] || 0;
                return healingA - healingB;
            } else if (isHealingA) {
                return -1;
            } else if (isHealingB) {
                return 1;
            } else {
                const damageTypeA = a.damage?.damage_type?.name || "Z";
                const damageTypeB = b.damage?.damage_type?.name || "Z";
                return damageTypeA.localeCompare(damageTypeB);
            }
        });

        setSortedSpells(sorted);
        console.log(sorted);
    };

    const sortByCastingTime = () => {
        const sorted = [...renderedSpells].sort((a, b) => {
            const getCastingTimeIndex = (time) => {
                switch (time) {
                    case "reaction": return 0;
                    case "bonus action": return 1;
                    case "action": return 2;
                    case "1 minute": return 3;
                    case "10 minutes": return 4;
                    case "1 hour": return 5;
                    case "8 hours": return 6;
                    case "24 hours": return 7;
                    default: return 8;
                }
            };

            const timeA = a.casting_time || "action";
            const timeB = b.casting_time || "action";

            return getCastingTimeIndex(timeA) - getCastingTimeIndex(timeB);
        });
        setSortedSpells(sorted);
    };

    const sortByRange = () => {
        const sorted = [...renderedSpells].sort((a, b) => {
            const getRangeIndex = (range) => {
                switch (range) {
                    case "Self": return -1;
                    case "Touch": return 0;
                    case "5 feet": return 1;
                    case "10 feet": return 2;
                    case "30 feet": return 3;
                    case "60 feet": return 4;
                    case "90 feet": return 5;
                    case "100 feet": return 5.5;
                    case "120 feet": return 6;
                    case "150 feet": return 7;
                    case "300 feet": return 8;
                    case "500 feet": return 9;
                    case "Sight": return 9.5;
                    case "1 mile": return 10;
                    case "500 miles": return 11;
                    case "Unlimited": return 12;
                    default: return 500;
                }
            };

            const rangeA = a.range || "Self";
            const rangeB = b.range || "Self";

            return getRangeIndex(rangeA) - getRangeIndex(rangeB);
        });
        setSortedSpells(sorted);
    };

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
                            onClick={sortByName}
                            className="catalogue-name"
                        />
                        <SortButton
                            text="Class"
                            onClick={() => sortByClass("Wizard")}
                            className="catalogue-classes"
                        />
                        <SortButton
                            text="Dam/Heal"
                            onClick={sortByDamageOrHealing}
                            className="catalogue-damage"
                        />
                        <SortButton
                            text="Type"
                            onClick={handleSortByType}
                            className="catalogue-type"
                        />
                        <SortButton
                            text="Casting Time"
                            onClick={sortByCastingTime}
                            className="catalogue-cast"
                        />
                        <SortButton
                            text="Range"
                            onClick={sortByRange}
                            className="catalogue-range"
                        />
                    </div>
                    <ul className="catalogue-list">
                        {sortedSpells.length > 0
                            ? sortedSpells.map((spell) => (
                            <CatalogueItem
                                name={spell.name}
                                index={spell.index}
                                url={spell.url}
                                key={spell.index}
                                filters={filters}
                                handleSpellDetails={handleSpellDetails}
                            />
                            ))
                                : spells.map((spell) => (
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