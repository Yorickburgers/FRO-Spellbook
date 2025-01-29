import './Favourites.css';
import FavouriteCard from "../../components/favouriteCard/FavouriteCard.jsx";

function Favourites() {
    const testArray = ["acid-arrow", "fireball", "healing-word", "wish"]

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