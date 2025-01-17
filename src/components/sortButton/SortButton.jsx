import './SortButton.css';

function SortButton({text, sortStyle}) {
    return (
        <button
            type="button"
            className="sorting-button"
            onClick={sortStyle}
        >{text}
        </button>
    );
}

export default SortButton;