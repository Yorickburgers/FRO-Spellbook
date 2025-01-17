import './CatalogueItem.css';
import {useEffect, useState} from "react";
import axios from "axios";

function CatalogueItem({index, name, url}) {
    const [spellDetails, setSpellDetails] = useState({});
    const [loading, setLoading] = useState(true);

    async function getSpellDetails() {
        try {
            const response = await axios.get(url);
            setSpellDetails(response.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getSpellDetails();
    }, [spellDetails]);

    if (loading) {
        return <div>Loading...</div>; // Show loading message while data is being fetched
    }

    return (
        <li className="catalogue-item" key={index}>
            <p>{name}</p>
            <p>{spellDetails.classes && spellDetails.classes.map((cls) => cls.name.join(", "))}</p>
            <p>{spellDetails.damage && spellDetails.damage.damage_at_slot_level[spellDetails.level] || " "}</p>
            <p>{spellDetails.damage && spellDetails.damage.damage_type.name || " "}</p>
            <p>{spellDetails.duration && spellDetails.duration}</p>
            <p>{spellDetails.range && spellDetails.range}</p>
        </li>
    );
}

export default CatalogueItem;