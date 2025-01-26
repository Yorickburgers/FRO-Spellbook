import './FilterOption.css';

function FilterOption({ type, option, category, toggleFilters, filters }) {
    const changeFilter = () => {
        toggleFilters(prevFilters => ({
            ...prevFilters,
            [category]: {
                ...prevFilters[category],
                [option]: !prevFilters[category][option]
            }
        }));
    };

    const checked = filters?.[category]?.[option] || false;

    return (
    <>
        <li className="filter-option">
            <input
                className="filter-option-checkbox"
                type={type}
            checked={checked}
            onChange={changeFilter}
            />
            {option}</li>
    </>
);
}

export default FilterOption;