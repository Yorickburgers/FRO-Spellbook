import './FilterOption.css';

function FilterOption({type, option}) {
return (
    <>
        <li className="filter-option"><input className="filter-option-checkbox" type={type}/>{option}</li>
    </>
);
}

export default FilterOption;