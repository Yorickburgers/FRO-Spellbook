import './CatalogueItem.css';
import {useEffect, useState} from "react";
import axios from "axios";

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
        return <div>Loading...</div>; // Show loading message while data is being fetched
    }

    const classes = spellDetails.classes ? spellDetails.classes.map((cls) => cls.name).join(", ") : "No classes available";
    const damage = spellDetails?.damage?.damage_at_slot_level?.[spellDetails.level] || spellDetails?.damage?.damage_at_character_level?.[1] || "No damage data";
    const damageType = spellDetails?.damage?.damage_type?.name || "No damage type";
    const duration = spellDetails.duration || "No duration available";
    const range = spellDetails.range || "No range available";

    return (
        <li className="catalogue-item" key={index}>
            <p>{name}</p>
            <p>{classes}</p>
            <p>{damage}</p>
            <p>{damageType}</p>
            <p>{duration}</p>
            <p>{range}</p>
        </li>
    );
}

export default CatalogueItem;