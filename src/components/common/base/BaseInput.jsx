export default function BaseInput({ value, onChange, placeholder = '', type = 'text' }) {
  return (
    <input
      className="base-input"
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
