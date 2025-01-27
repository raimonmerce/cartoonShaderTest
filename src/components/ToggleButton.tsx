import React from "react";

interface ToggleButtonProps {
  onClick: () => void;
  label: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ onClick, label }) => {
  return (
    <button
      style={{
        marginTop: 10,
        padding: "10px 20px",
        fontSize: "16px",
        background: "#4caf50",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default ToggleButton;