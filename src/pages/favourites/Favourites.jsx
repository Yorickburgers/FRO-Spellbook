import './Favourites.css';
import FavouriteCard from "../../components/favouriteCard/FavouriteCard.jsx";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";

function Favourites() {
    const testArray = ["acid-arrow", "fireball", "healing-word", "wish", "eldritch-blast", "dimension-door", "fire-bolt", "false-life", "sleep", "meteor-swarm"]
    const {favourites} = useContext(AuthContext);
    function handleDelete(spell) {
        console.log({spell} + " was deleted!");
    }

return (
<main className="page-container favourites-page">
    <h1 className="page-title">Favourites</h1>
    <section className="outer-container favourites-container">
        {testArray.map((spell) => (
            <FavouriteCard
                key={spell}
                index={spell}
                handleDelete={handleDelete}
            />
        ))}
    </section>
</main>
);
}

export default Favourites;