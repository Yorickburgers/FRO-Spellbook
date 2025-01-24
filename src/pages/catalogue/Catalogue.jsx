import './Catalogue.css';
import SortButton from "../../components/sortButton/SortButton.jsx";
import CatalogueItem from "../../components/catalogueItem/CatalogueItem.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

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
                        <li className="filter-list-item">Level</li>
                        <li className="filter-list-item">Duration</li>
                        <li className="filter-list-item">Components</li>
                        <li className="filter-list-item">Classes</li>
                        <li className="filter-list-item">Casting time</li>
                        <li className="filter-list-item">Range</li>
                        <li className="filter-list-item">Attack</li>
                        <li className="filter-list-item">DC-type</li>
                        <li className="filter-list-item"><label htmlFor="includes-input">Includes: <input name="includes-input" type="text"/></label></li>
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