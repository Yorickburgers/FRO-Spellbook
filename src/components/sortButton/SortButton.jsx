import './SortButton.css';

function SortButton({text, sortStyle, className}) {
    return (
        <button
            type="button"
            className={`sorting-button ${className}`}
            onClick={sortStyle}
        >{text}
        </button>
    );
}

export default SortButton;