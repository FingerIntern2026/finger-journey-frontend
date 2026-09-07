function BaseCard({ children }) {
    return (
        <div
            style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "16px",
            }}
        >
            {children}
        </div>
    );
}

export default BaseCard;