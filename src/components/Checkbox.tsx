import React, { useState } from "react";

interface CheckboxProps {
  label: string;
  setValue: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, setValue }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    const newCheckedState = !checked;
    setChecked(newCheckedState);
    setValue(newCheckedState);
  };

  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        fontSize: "16px",
        cursor: "pointer",
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        style={{ marginRight: 10 }}
      />
      {label}
    </label>
  );
};

export default Checkbox;