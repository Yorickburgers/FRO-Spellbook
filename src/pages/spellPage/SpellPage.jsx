import './SpellPage.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import HideTab from "../../components/hideTab/HideTab.jsx";

function SpellPage() {
    const {id} = useParams();
    const [spellDetails, setSpellDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [hidden, toggleHidden] = useState({
        level: null
    })

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
    }, [id, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const classes = spellDetails.classes
        ? spellDetails.classes.map((cls) => cls.name.slice(0, 3)).join(", ")
        : null;
    const damageType = spellDetails?.damage?.damage_at_slot_level?.[spellDetails?.level] && spellDetails?.damage?.damage_type?.name
        ? `${spellDetails?.damage?.damage_at_slot_level[spellDetails?.level]} ${spellDetails?.damage?.damage_type?.name}`
        : null;
    const healing = spellDetails?.heal_at_slot_level?.[spellDetails.level] || null;
    const castTime = spellDetails?.casting_time || null;
    const range = spellDetails?.range || null;
    const attack = spellDetails?.attack_type || null;
    const description = Array.isArray(spellDetails?.desc)
        ? spellDetails.desc.map((desc, index) => (<p key={index} className="spell-description">{desc}</p>))
        : <p className="spell-description">{spellDetails?.desc || null}</p>;
    const upcast = spellDetails?.higher_level?.length > 0 ? spellDetails?.higher_level : null;
    const duration = spellDetails?.duration + (spellDetails?.concentration === true ? " (con)" : "") || null;
    const level = spellDetails?.level || "cantrip";
    const dc = spellDetails?.dc?.dc_type?.name || null;

    return (
        <main className="page-container spell-details-outer">
            <h1 className="page-title">Spell Details</h1>
            <div className="spell-outer-container">
                <HideTab/>
                <div className="spell-details-container printed">
                    <div className="spell-name-container">
                        <p className="star" onClick={(e) => e.target.classList.toggle("favourited")}>★</p>
                        <h1 className="spell-name">{spellDetails.name}</h1>
                        <button
                            type="button"
                            onClick={() => window.print()}
                            className="button print-button"
                        >Print
                        </button>
                    </div>
                    <div className="spell-attributes-container">
                        <p className="spell-attribute">Level: {level}</p>
                        <p className="spell-attribute">Duration: {duration}</p>
                        <p className="spell-attribute">Components: {spellDetails?.components && spellDetails.components.map((comp) => comp).join(", ")}</p>
                        <p className="spell-attribute">Classes: {classes}</p>
                        <p className="spell-attribute">Casting time: {castTime}</p>
                        <p className="spell-attribute">Range: {range}</p>
                        {attack && <p className="spell-attribute">Attack: {attack}</p>}
                        {dc && <p className="spell-attribute">DC: {dc}</p>}
                        {healing && <p className="spell-attribute">Healing: {healing}</p>}
                        {damageType !== undefined + " " + undefined && damageType !== null &&
                            <p className="spell-attribute">Damage: {damageType}</p>}
                    </div>
                    <div className="spell-description-container">{description}
                        {upcast && <p className="spell-description">Upcast: {upcast}</p>}</div>
                </div>
                <div></div> {/*dummy for positioning */}
            </div>
            <div></div> {/*dummy for positioning */}
        </main>
    );
}

export default SpellPage;