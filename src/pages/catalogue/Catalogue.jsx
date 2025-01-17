import './Catalogue.css';
import SortButton from "../../components/sortButton/SortButton.jsx";

function Catalogue() {
return (
<main className="page-container">
    <div className="outer-container">
        <div className="inner-container filters">test</div>
        <div className="inner-container">
            <div className="sorting-tags-container">
                <SortButton
                    text="Name"
                    sortStyle="null"
                />
                <SortButton
                    text="Class"
                    sortStyle="null"
                />
                <SortButton
                    text="Damage"
                    sortStyle="null"
                />
                <SortButton
                    text="Type"
                    sortStyle="null"
                />
                <SortButton
                    text="Duration"
                    sortStyle="null"
                />
                <SortButton
                    text="Range"
                    sortStyle="null"
                />
                </div>
            <ul>
                <li>spell 1</li>
                <li>spell2</li>
            </ul>
        </div>
    </div>
</main>
);
}

export default Catalogue;