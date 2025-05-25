import React, { useState } from "react";
import "./styles/ToggleButton.css";

function ToggleButton({ onClick }: { onClick: () => void }) {
    const [isOn, setIsOn] = useState(false);

    const handleToggle = () => {
        setIsOn((prev) => !prev);
        onClick();
    };

    return (
        <label data-testid="toggle" className="switch">
            <input type="checkbox" checked={isOn} onChange={handleToggle} />
            <span className="slider"></span>
        </label>
    );
}

export default ToggleButton;
