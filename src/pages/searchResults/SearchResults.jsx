import './SearchResults.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function SearchResults() {
    const [loading, setLoading] = useState(true);
    const [allSpells, setAllSpells] = useState({});


    useEffect(() => {
        const controller = new AbortController();

        async function getSpells() {
            try {
                const response = await axios.get(`https://www.dnd5eapi.co/api/spells`, {
                    signal: controller.signal,
                });
                setAllSpells(response.data);
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
        const controller = new AbortController();

        async function getSpells() {
            try {
                const response = await axios.get(`https://www.dnd5eapi.co/api/spells`, {
                    signal: controller.signal,
                });
                setAllSpells(response.data);
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
    }, [allSpells]);


    return (
<>

</>
);
}

export default SearchResults;