export default function BaseSelect({ options = [], value, onChange }) {
  return (
    <select className="base-select" value={value} onChange={onChange}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
