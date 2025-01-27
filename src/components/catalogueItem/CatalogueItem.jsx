import './CatalogueItem.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";

function CatalogueItem({index, name, url, filters, handleSpellDetails}) {
    const [spellDetails, setSpellDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [isRendered, setIsRendered] = useState(true);


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

    useEffect(() => {
        if (Object.keys(spellDetails).length > 0) {
            const isCategoryFiltered = (category, filters) => Object.values(filters[category]).includes(true);

            const levelMatch = !isCategoryFiltered("level", filters) || filters.level[spellDetails.level] || false;
            const typeMatch = !isCategoryFiltered("type", filters) || filters.type[spellDetails?.damage?.damage_type?.name.toLowerCase()] || (filters.type.healing && Object.keys(spellDetails).includes("heal_at_slot_level")) || false;
            const classMatch = !isCategoryFiltered("classes", filters) || spellDetails.classes?.some(cls => filters.classes[cls.name.toLowerCase()]) || false;
            const timeMatch = !isCategoryFiltered("castTime", filters) || (filters.castTime.action && spellDetails.casting_time === "1 action") || (filters.castTime["bonus action"] && spellDetails.casting_time === "1 bonus action") || (filters.castTime.timed && spellDetails.casting_time.includes("hour" || "minute" )) || false;
            const attackMatch = !isCategoryFiltered("attack", filters) || filters.attack[spellDetails.attack_type] || false;
            const rangeMatch = !isCategoryFiltered("range", filters) || filters.range[spellDetails.range.toLowerCase()] || false;
            const dcTypeMatch = !isCategoryFiltered("dcType", filters) || filters.dcType[spellDetails?.dc?.dc_type?.index] || false;
            const includesMatch = spellDetails?.name && spellDetails.name.toLowerCase().includes(filters.includes.toLowerCase()) || spellDetails?.desc && spellDetails.desc.some(description => description.toLowerCase().includes(filters.includes.toLowerCase())) || false;
            setIsRendered(levelMatch && typeMatch && classMatch && timeMatch && attackMatch && rangeMatch && dcTypeMatch && includesMatch);
        }
    }, [filters, spellDetails]);

    useEffect(() => {
        if (isRendered) {
            handleSpellDetails(spellDetails);
        }
    }, [isRendered, spellDetails, handleSpellDetails]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isRendered) {
        return null;
    } else {
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
    )}
}

export default CatalogueItem;