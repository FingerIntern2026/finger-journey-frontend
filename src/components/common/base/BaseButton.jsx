export default function BaseButton({ label, onClick, variant = 'primary', disabled = false}) {

    return (
        <button className={`base-button base-button--${variant}`} onClick={onClick} disabled = {disabled}>
        {label}
            </button>
    );
}