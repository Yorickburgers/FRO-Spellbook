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
        return <div>Loading...</div>; // Show loading message while data is being fetched
    }

        return (
            <main className="page-container">
                <div className="outer-container">
                    <div className="inner-container filters">test</div>
                    <div className="inner-container">
                        <div className="sorting-tags-container">
                            <SortButton
                                text="Name"
                                sortStyle="null"
                            />
                            <SortButton
                                text="Class"
                                sortStyle="null"
                            />
                            <SortButton
                                text="Damage"
                                sortStyle="null"
                            />
                            <SortButton
                                text="Type"
                                sortStyle="null"
                            />
                            <SortButton
                                text="Duration"
                                sortStyle="null"
                            />
                            <SortButton
                                text="Range"
                                sortStyle="null"
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