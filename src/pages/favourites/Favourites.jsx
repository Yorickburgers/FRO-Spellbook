import './Favourites.css';
import FavouriteCard from "../../components/favouriteCard/FavouriteCard.jsx";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";

function Favourites() {
    const {favourites, setFavourites} = useContext(AuthContext);

    function handleDelete(spell) {
        const updatedFavourites = [...favourites];
        updatedFavourites.splice(updatedFavourites.indexOf(spell), 1);
        setFavourites(updatedFavourites);
    }

    return (
        <main className="page-container favourites-page">
            <h1 className="page-title">Favourites</h1>
            <section className="outer-container favourites-container">
                {favourites
                    ? favourites.map((spell) => (
                        <FavouriteCard
                            key={spell}
                            index={spell}
                            handleDelete={handleDelete}
                        />
                    ))
                    : <p>No favourites were found.</p>}
            </section>
        </main>
    );
}

export default Favourites;