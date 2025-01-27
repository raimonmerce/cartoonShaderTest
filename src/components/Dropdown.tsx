
interface DropdownProps {
    label: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, value, onChange }) => {
    return (
        <div style={{ marginBottom: 10 }}>
        <label>
            {label}:
            <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{ marginLeft: 5 }}
            >
            {options.map((option) => (
                <option key={option} value={option}>
                {option}
                </option>
            ))}
            </select>
        </label>
        </div>
    );
};

export default Dropdown