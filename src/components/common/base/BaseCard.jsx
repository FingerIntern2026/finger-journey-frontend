import styles from './base.module.css';

function BaseCard({ children, className = '' }) {
    return (
        <div className={`${styles.card} ${className}`}>
            {children}
        </div>
    );
}

export default BaseCard;