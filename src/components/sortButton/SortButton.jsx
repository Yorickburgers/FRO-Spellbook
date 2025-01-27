import './SortButton.css';

function SortButton({text, onClick, className}) {
    return (
        <button
            type="button"
            className={`sorting-button ${className}`}
            onClick={onClick}
        >{text}
        </button>
    );
}

export default SortButton;