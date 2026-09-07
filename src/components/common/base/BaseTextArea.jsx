export default function BaseTextArea({ value, onChange, rows = 4, placeholder = '' }) {
  return (
    <textarea
      className="base-textarea"
      value={value}
      onChange={onChange}
      rows={rows}
      placeholder={placeholder}
    />
  );
}
