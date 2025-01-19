import './CatalogueItem.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";

function CatalogueItem({index, name, url}) {
    const [spellDetails, setSpellDetails] = useState({});
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const controller = new AbortController();

        async function getSpellDetails() {
            try {
                const response = await axios.get(`https://www.dnd5eapi.co${url}`, {
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
    }, [url]);

    console.log(spellDetails)
    if (loading) {
        return <div>Loading...</div>;
    }

    const classes = spellDetails.classes
        ? spellDetails.classes.map((cls) => cls.name.slice(0, 3)).join(", ")
        : " ";
    const damage = spellDetails?.damage?.damage_at_slot_level?.[spellDetails.level] || spellDetails?.damage?.damage_at_character_level?.[1] || spellDetails?.heal_at_slot_level?.[spellDetails.level] || " ";
    const damageType = spellDetails?.damage?.damage_type?.name || (spellDetails?.heal_at_slot_level ? "Healing" : " ") || " ";
    const castTime = spellDetails.casting_time || " ";
    const range = spellDetails.range || " ";

    return (
        <NavLink className="catalogueLink" to={`/spells/${index}`}>
            <li className="catalogue-item" key={index}>
                <p className="catalogue-name">{name}</p>
                <p className="catalogue-classes">{classes}</p>
                <p className="catalogue-damage">{damage}</p>
                <p className="catalogue-type">{damageType}</p>
                <p className="catalogue-cast">{castTime}</p>
                <p className="catalogue-range">{range}</p>
            </li>
        </NavLink>
    );
}

export default CatalogueItem;