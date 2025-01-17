import './Catalogue.css';

function Catalogue() {
return (
<main className="page-container">
    <div className="outer-container">
        <div className="inner-container filters">test</div>
        <div className="inner-container">
            <div className="sorting-tags-container">
                <h2>Name</h2>
                <h2>Class</h2>
                <h2>Damage</h2>
                <h2>Type</h2>
                <h2>Duration</h2>
                <h2>Range</h2>
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