import './RangeSlider.css';
import {useState} from "react";

function RangeSlider() {
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(300);

    // Handle min value input
    const handleMinInputChange = (e) => {
        const value = Math.min(Number(e.target.value), maxValue); // Ensure minValue is less than maxValue
        setMinValue(value);
    };

    // Handle max value input
    const handleMaxInputChange = (e) => {
        const value = Math.max(Number(e.target.value), minValue); // Ensure maxValue is greater than minValue
        setMaxValue(value);
    };

    // Handle slider change
    const handleMinSliderChange = (e) => {
        const value = Math.min(Number(e.target.value), maxValue); // Prevent min > max
        setMinValue(value);
    };

    const handleMaxSliderChange = (e) => {
        const value = Math.max(Number(e.target.value), minValue); // Prevent max < min
        setMaxValue(value);
    };

    return (
        <div className="range-slider-container">
            <div className="slider">
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={minValue}
                    onChange={handleMinSliderChange}
                    className="slider-min"
                />
                <input
                    type="range"
                    min="0"
                    max="300"
                    value={maxValue}
                    onChange={handleMaxSliderChange}
                    className="slider-max"
                />
            </div>
            <div className="inputs">
                <label htmlFor="min-slider" className="slider-label">Min:
                <input
                    type="number"
                    value={minValue}
                    onChange={handleMinInputChange}
                    min="0"
                    max={maxValue}
                    className="min-input"
                    name="min-slider"
                /></label>
                <label htmlFor="max-slider" className="slider-label">Max:
                    <input
                    type="number"
                    value={maxValue}
                    onChange={handleMaxInputChange}
                    min={minValue}
                    max="300"
                    className="max-input"
                    name="max-slider"
                /></label>
            </div>
        </div>
    );
}

export default RangeSlider;