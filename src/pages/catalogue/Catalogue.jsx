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
                <div className="outer-container">
                    <div className="catalogue filters">test</div>
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
                                text="Damage"
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
                                key={spell.index}
                                url={spell.url}
                                />
                                ))}
                        </ul>
                    </div>
                </div>
            </main>
        );
    }

    export default Catalogue;