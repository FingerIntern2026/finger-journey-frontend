export default function BaseBadge({ label, color = 'gray' }) {
    return (
        <span className={`base-badge base-badge--${color}`}>
      {label}
    </span>
    );
}