import './SearchResult.css';
import {Link} from "react-router-dom";

function SearchResult({name, index}) {
return (
<>
    <li className="search-result">
        <Link to={`/spells/${index}`}>{name}</Link>
    </li>
</>
);
}

export default SearchResult;