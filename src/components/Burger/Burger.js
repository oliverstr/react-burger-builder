import React from 'react';
import styles from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burguer = ({ ingredients }) => {

    let transformedIngredients = Object.keys(ingredients)
        .map(key => { 
            return [...Array(ingredients[key])].map((_, i) => {
                return <BurgerIngredient key={key + i} type={key} />
            })
         })
         .reduce((arr, el) => {
             return arr.concat(el);
         }, []);
         if (transformedIngredients.length === 0) {
            transformedIngredients = <p>Please start adding ingredients! </p>;
         }
    return (
        <div className={styles.burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default Burguer;