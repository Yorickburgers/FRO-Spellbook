import './FavouriteCard.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function FavouriteCard({index, handleDelete}) {
   const [spellDetails, setSpellDetails] = useState({});
   const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        async function getSpellDetails() {
            try {
                const response = await axios.get(`https://www.dnd5eapi.co/api/spells/${index}`, {
                    signal: controller.signal,
                });
                setSpellDetails(response.data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }

        getSpellDetails();

        return function cleanup() {
            controller.abort();
        }
    }, []);


    if (loading) return (
        <p>Loading...</p>
    )

    const dmgHealAmount = spellDetails?.damage?.damage_at_slot_level?.[spellDetails.level] || spellDetails?.damage?.damage_at_character_level?.[1] || spellDetails?.heal_at_slot_level?.[spellDetails.level] || "";
    const dmgHealType = spellDetails?.damage?.damage_type?.name || (spellDetails?.heal_at_slot_level ? "Healing" : "") || "";
    const dmgHeal = dmgHealAmount + " " + dmgHealType

    return (
        <article className="favourite-card">
            <h2 className="spell-name">
                <Link className="catalogueLink" to={`/spells/${index}`}>{spellDetails.name}</Link>
            </h2>
            <div className="favourite-details">
                {dmgHealType === "Healing" && <p>Healing: {dmgHeal}</p>}
                {spellDetails?.damage && <p>Damage: {dmgHeal}</p>}
                {!dmgHealType && <p>Support</p>}
                <p>Level: {spellDetails.level}</p>
            </div>
            <button type="button" className="button" onClick={() => handleDelete(index)}>Remove from favourites</button>
        </article>
    );
}

export default FavouriteCard;