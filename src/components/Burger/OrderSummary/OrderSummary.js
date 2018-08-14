import React, { Fragment } from 'react';
import Button from '../../UI/Button/Button'

const OrderSummary = (props) => {
    
    const ingredientSummary = [];
    for (const key in props.ingredients){
        ingredientSummary.push(
            <li key={key}>
                <span style={{ textTransform: 'capitalize' }}>{key}</span> : {props.ingredients[key]}
            </li>
        )
    };
    
    return (
        <Fragment>
            <h3>Your order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>

            <p>Your total is: <strong>R$ {props.price.toFixed(2)}</strong></p>

            <p>Continue to Checkout?</p>
            <Button buttonType="Danger" clicked={props.cancelPurchase}>Cancel</Button>
            <Button buttonType="Success" clicked={props.continuePurchase}>Continue</Button>
        </Fragment>
    );
}

export default OrderSummary;