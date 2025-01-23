import './SearchResults.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import SearchResult from "../../components/searchResult/SearchResult.jsx";

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

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
<>
    <main className="page-container">
        <h1 className="page-title">Search results for ~ {searchTerm} ~</h1>
        <h2 className="search-results-count">Er zijn {filteredSpells.length} </h2>
        <ul className="search-results-container">
            {filteredSpells.map((spell) => (
                <SearchResult
                    name={spell.name}
                    index={spell.index}
                    key={spell.index}
                />
            ))}
        </ul>
    </main>
</>
);
}

export default SearchResults;