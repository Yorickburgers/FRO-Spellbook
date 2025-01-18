import './SpellPage.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

function SpellPage() {
    const { id } = useParams();
    const [spellDetails, setSpellDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        const controller = new AbortController();


        async function getSpells() {
            try {
                const response = await axios.get(`https://www.dnd5eapi.co/api/spells/${id}`, {
                    signal: controller.signal,
                });
                setSpellDetails(response.data);
            } catch (e) {
                console.error(e);
                if (e.response && e.response.status === 404) {
                    navigate("*");
                }
            } finally {
                setLoading(false);
            }
        }

        getSpells();

        return function cleanup() {
            controller.abort();
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const classes = spellDetails.classes
        ? spellDetails.classes.map((cls) => cls.name.slice(0, 3)).join(", ")
        : " ";
    const damageType = spellDetails?.damage?.damage_type?.name || " ";
    const castTime = spellDetails?.casting_time || " ";
    const range = spellDetails?.range || " ";
    const attack = spellDetails?.attack_type || " ";
    const description = spellDetails?.desc || " ";
    const upcast = spellDetails?.higher_level || " ";
    const duration = spellDetails?.duration || " ";
    const level = spellDetails?.level || " ";

    return (
<main className="page-container">
    <h1 className="page-title">Spell Details</h1>
    <div className="spell-outer-container">
        <div className="hide-bar">hide</div>
        <div className="spell-details-container">
            <h1 className="spell-name">{spellDetails.name}</h1>
            <div className="spell-attributes-container">
                <p className="spell-attribute">Level: {level}</p>
                <p className="spell-attribute">Duration: {duration}</p>
                <p className="spell-attribute">Components: {spellDetails?.components && spellDetails.components.map((comp) => comp).join(", ")}</p>
                <p className="spell-attribute">Classes: {classes}</p>
                <p className="spell-attribute">Casting time: {castTime}</p>
                <p className="spell-attribute">Range: {range}</p>
                <p className="spell-attribute">Attack: {attack}</p>
                <p className="spell-attribute">Damage: {damageType}</p>
            </div>
            <p className="spell-description">{description}</p>
            {upcast && <p className="spell-description">Upcast: {upcast}</p>}
        </div>
        <div></div>
    </div>
</main>
);
}

export default SpellPage;