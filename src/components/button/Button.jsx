import './Button.css';
import {useNavigate} from "react-router-dom";

function Button({text, link}) {
    const navigate = useNavigate();

    function clickHandler(e, link) {
        e.preventDefault();
        navigate(link);
    }

    return (
        <>
            <button
                className="button"
                type="button"
                onClick={(e) => clickHandler(e, link)}
            >{text}</button>

        </>
    );
}

export default Button;