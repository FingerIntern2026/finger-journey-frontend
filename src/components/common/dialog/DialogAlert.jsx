import BaseButton from "../base/BaseButton";

export default  function DialogAlert({ open, message, onClose}) {
    if (!open) {
        return null;
    }

    return (
        <div className="dialog-overlay">
            <div className="dialog-box">
                <p>{message}</p>
                <BaseButton label="확인" onClick={onClose} />
            </div>
        </div>
    )
}