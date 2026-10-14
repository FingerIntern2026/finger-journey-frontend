import { getHighlightSegments } from '../../../utils/highlightUtils.js';
import styles from './custom.module.css';

export function highlightText(text, keyword) {
    return getHighlightSegments(text, keyword).map((segment, index) => (
        segment.matched
            ? <mark key={index} className={styles.highlight}>{segment.text}</mark>
            : <span key={index}>{segment.text}</span>
    ));
}
