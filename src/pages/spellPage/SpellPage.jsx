import './SpellPage.css';

function SpellPage() {
return (
<main className="page-container">
    <h1 className="page-title">Spell Details</h1>
    <div className="spell-outer-container">
        <div className="hide-bar">hide</div>
        <div className="spell-details-container">
            <h1 className="spell-name">Acid Arrow</h1>
            <div className="spell-attributes-container">
                <p className="spell-attribute">Level: 2nd</p>
                <p className="spell-attribute">Duration: Instantaneous</p>
                <p className="spell-attribute"> Components: V, S, M</p>
                <p className="spell-attribute">Classes: Wiz</p>
            {/*</div>*/}
            {/*<div className="spell-attributes-container">*/}
                <p className="spell-attribute">Casting time: 1 action</p>
                <p className="spell-attribute">Range: 90 feet</p>
                <p className="spell-attribute">Attack: Ranged</p>
                <p className="spell-attribute">Damage: Acid</p>
            </div>
            <p className="spell-description">A shimmering green arrow streaks toward a target within range and bursts in a spray of acid. Make a ranged spell attack against the target. On a hit, the target takes 4d4 acid damage immediately and 2d4 acid damage at the end of its next turn. On a miss, the arrow splashes the target with acid for half as much of the initial damage and no damage at the end of its next turn.</p>
            <p className="spell-description">Upcast: When you cast this spell using a spell slot of 3rd level or higher, the damage (both initial and later) increases by 1d4 for each slot level above 2nd.</p>
        </div>
        <div></div>
    </div>
</main>
);
}

export default SpellPage;