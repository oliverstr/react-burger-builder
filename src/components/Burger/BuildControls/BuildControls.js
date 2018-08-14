import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import styles from './BuildControls.css';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
]

const BuildControls = ({ingredientAdded, ingredientRemoved, disabled, price, purchasable, purchase}) => (
    <div className={styles.buildControls}>
        <p>Current Price: <strong>R$ {price.toFixed(2)}</strong></p>
        { controls.map(control => (
        <BuildControl 
            key={control.label} 
            label={control.label}
            disabled={disabled[control.type]} 
            added={() => ingredientAdded(control.type)}
            removed={() => ingredientRemoved(control.type)}/>
        ))}
        <button className={styles.OrderButton} disabled={!purchasable} onClick={purchase}>ORDER NOW</button>
    </div>
);

export default BuildControls;