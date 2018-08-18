import React from 'react';
import styles from './Order.css';

const order = (props) => {
    const ingredients = [];
    for (const key in props.order.ingredients){
        ingredients.push(`${key} (${props.order.ingredients[key]})`)
    }
    return (
    <div className={styles.Order}>
        <p>Ingredients: {ingredients.join(' ')}</p>
        <p>Price: <strong>USD {props.order.price}</strong></p>
    </div>
)};
 
export default order;