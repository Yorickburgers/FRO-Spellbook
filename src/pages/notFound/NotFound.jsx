import './NotFound.css';
import {Link} from "react-router-dom";

function NotFound() {
return (
<main className="page-container">
    <div className="error-container">
        <p>Uh oh... it seems you got lost in the Astral Planes.</p>
        <p>Click <Link to="/">here</Link> to return to the homepage.</p>
    </div>
</main>
);
}

export default NotFound;