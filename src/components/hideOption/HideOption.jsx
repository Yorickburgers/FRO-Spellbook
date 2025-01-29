import './HideOption.css';

function HideOption({ category, toggleHidden, hidden }) {
    const changeHidden = () => {
        toggleHidden(prevHidden => ({
            ...prevHidden,
            [category]: !prevHidden[category]
            }
        ));
    };

    const checked = hidden?.[category] || false;

    return (
        <>
            <li className="hide-option">
                <input
                    className="hide-option-checkbox"
                    type="checkbox"
                    checked={checked}
                    onChange={changeHidden}
                />
                {category}</li>
        </>
);
}

export default HideOption;