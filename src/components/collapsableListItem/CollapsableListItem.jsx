import './CollapsableListItem.css';

function CollapsableListItem({name, children}) {
return (
    <>
        <li className="filter-list-item">
            <label htmlFor={name}>
                <button
                className="filter-collapse-button"
                type="button"
                name={name}
            />
            {name}
            </label>
        </li>
        <div className="filter-content">
            {children}
        </div>
    </>
);
}

export default CollapsableListItem;