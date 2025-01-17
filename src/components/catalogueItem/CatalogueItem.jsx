import './CatalogueItem.css';

function CatalogueItem({key, name, classes, damage, type, duration, range}) {
    return (
        <li className="catalogue-item" key={key}>
            <p>{name}</p>
            <p>{classes}</p>
            <p>{damage}</p>
            <p>{type}</p>
            <p>{duration}</p>
            <p>{range}</p>
        </li>
    );
}

export default CatalogueItem;