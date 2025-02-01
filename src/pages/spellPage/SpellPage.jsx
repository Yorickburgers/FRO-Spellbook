import './SpellPage.css';
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import HideTab from "../../components/hideTab/HideTab.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";

function SpellPage() {
    const {id} = useParams();
    const [spellDetails, setSpellDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [hidden, toggleHidden] = useState({
        level: false,
        duration: false,
        components: false,
        classes: false,
        "casting time": false,
        range: false,
        attack: false,
        dc: false,
        healing: false,
        damage: false,
    })
    const [tabOpen, setTabOpen] = useState(false);
    const {favourites, setFavourites} = useContext(AuthContext);

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

    const toggleFavourite = (id) => {
        setFavourites(prevFavourites =>
            prevFavourites.includes(id)
                ? prevFavourites.filter(fav => fav !== id)
                : [...prevFavourites, id]
        );
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const classes = spellDetails.classes
        ? spellDetails.classes.map((cls) => cls.name.slice(0, 3)).join(", ")
        : null;
    const damageType = (spellDetails?.damage?.damage_at_slot_level && `${spellDetails?.damage?.damage_at_slot_level?.[spellDetails?.level]} ${spellDetails?.damage?.damage_type?.name}`) || (spellDetails?.damage?.damage_at_character_level && `${spellDetails?.damage?.damage_at_character_level?.[1]} ${spellDetails?.damage?.damage_type?.name}`) || null;
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
            <section className="spell-outer-container">
                <HideTab
                    tabOpen={tabOpen}
                    setTabOpen={setTabOpen}
                    hidden={hidden}
                    toggleHidden={toggleHidden}/>
                <article className="spell-details-container printed">
                    <div className="spell-name-container">
                        <p className={`star ${favourites.includes(id) ? "favourited" : ""}`} onClick={() => toggleFavourite(id)}>★</p>
                        <h1 className="spell-name">{spellDetails.name}</h1>
                        <button
                            type="button"
                            onClick={() => window.print()}
                            className="button print-button"
                        >Print
                        </button>
                    </div>
                    <div className="spell-attributes-container">
                        <p className={`spell-attribute${hidden.level ? " hidden" : ""}`}>Level: {level}</p>
                        <p className={`spell-attribute${hidden.duration ? " hidden" : ""}`}>Duration: {duration}</p>
                        <p className={`spell-attribute${hidden.components ? " hidden" : ""}`}>Components: {spellDetails?.components && spellDetails.components.map((comp) => comp).join(", ")}</p>
                        <p className={`spell-attribute${hidden.classes ? " hidden" : ""}`}>Classes: {classes}</p>
                        <p className={`spell-attribute${hidden["casting time"] ? " hidden" : ""}`}>Casting
                            time: {castTime}</p>
                        <p className={`spell-attribute${hidden.range ? " hidden" : ""}`}>Range: {range}</p>
                        {attack &&
                            <p className={`spell-attribute${hidden.attack ? " hidden" : ""}`}>Attack: {attack}</p>}
                        {dc && <p className={`spell-attribute${hidden.dc ? " hidden" : ""}`}>DC: {dc}</p>}
                        {healing &&
                            <p className={`spell-attribute${hidden.healing ? " hidden" : ""}`}>Healing: {healing}</p>}
                        {damageType !== undefined + " " + undefined && damageType !== null &&
                            <p className={`spell-attribute${hidden.damage ? " hidden" : ""}`}>Damage: {damageType}</p>}
                    </div>
                    <div className="spell-description-container">{description}
                        {upcast && <p className="spell-description">Upcast: {upcast}</p>}</div>
                </article>
                <div className={`position-dummy ${tabOpen ? "open" : ""}`}></div>
            </section>
        </main>
    );
}

export default SpellPage;