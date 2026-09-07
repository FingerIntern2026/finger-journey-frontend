function BaseCheckbox({ checked, onClick }) {
    return (
        <div
            onClick={onClick}
            style={{
                width: "24px",
                height: "24px",
                border: "1px solid #999",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                backgroundColor: checked ? "#4CAF50" : "white",
                color: "white",
            }}
        >
            {checked ? "✓" : ""}
        </div>
    );
}

export default BaseCheckbox;