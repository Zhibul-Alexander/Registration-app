function Checkbox({ label, value, checked, onChange }) {
    return (
        <label>
            <input type="radio" name="gender" value={value} checked={checked} onChange={onChange} />
            {label}
        </label>
    );
}

export const CheckboxGroup = ({ value: groupValue, options, onChange }) => {
    return (
        <div>
            {options.map(({ value, label }) => (
                <Checkbox value={value} label={label} checked={value === groupValue} onChange={onChange}/>
            ))}
        </div>
    );
};

