import React from 'react';
import styles from './BuildControl.css';

const BuildControl = ({label, added, removed, disabled}) => (
    <div className={styles.BuildControl}>
        <div className={styles.Label}>{label}</div>
        <button className={styles.Less} onClick={removed} disabled={disabled}>Less</button>
        <button className={styles.More} onClick={added}>More</button>
    </div>
);

export default BuildControl;