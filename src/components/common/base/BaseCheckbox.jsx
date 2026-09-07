export default function BaseCheckbox({ checked, onChange, label }) {
  return (
    <label className="base-checkbox">
      <input type="checkbox" checked={checked} onChange={onChange} />
      {label}
    </label>
  );
}
