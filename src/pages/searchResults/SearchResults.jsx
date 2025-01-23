import './SearchResults.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import SearchResult from "../../components/searchResult/SearchResult.jsx";

function SearchResults() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [allSpells, setAllSpells] = useState([]);
    const [filteredSpells, setFilteredSpells] = useState([]);
    const { searchTerm } = useParams();

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
            return !!spell.name.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setFilteredSpells(filteredSpells);
        filteredSpells.length === 1 && navigate(`/spells/${filteredSpells[0].index}`)
    }, [allSpells, searchTerm]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
<>
    <main className="page-container search-results">
        <h1 className="page-title">{filteredSpells.length} search results for - {searchTerm} -</h1>
            <ul className="search-results-container">
            {filteredSpells.length >= 2 && filteredSpells.map((spell) => (
                <SearchResult
                    name={spell.name}
                    index={spell.index}
                    key={spell.index}
                />
            ))}
                {filteredSpells.length === 0 &&
                    <li className="search-result none">You are out of luck... no such spell exists.</li>}
        </ul>
    </main>
</>
);
}

export default SearchResults;