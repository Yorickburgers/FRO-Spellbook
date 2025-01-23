import './SearchResults.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

function SearchResults() {
    const [loading, setLoading] = useState(true);
    const [allSpells, setAllSpells] = useState([]);
    const [filteredSpells, setFilteredSpells] = useState([]);
    const {searchTerm} = useParams();

    useEffect(() => {
        const controller = new AbortController();

        async function getSpells() {
            try {
                const response = await axios.get(`https://www.dnd5eapi.co/api/spells`, {
                    signal: controller.signal,
                });
                setAllSpells(response.data.results);
            } catch (e) {
                console.error(e);
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
        const filteredSpells = allSpells.filter((spell) => {
            return !!spell.name.includes(`${searchTerm}`);
        });
        setFilteredSpells(filteredSpells);
    }, [allSpells, searchTerm]);


    return (
<>

</>
);
}

export default SearchResults;