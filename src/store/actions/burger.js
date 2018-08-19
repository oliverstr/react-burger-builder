import * as actions from './actionsTypes'
import axios from '../../axios-orders';

export const addIngredient = payload => {
    return {
        type: actions.ADD_INGREDIENT,
        payload: payload
    }
}

export const removeIngredient = payload => {
    return {
        type: actions.REMOVE_INGREDIENT,
        payload: payload
    }
}
export const setIngredients = payload => {
    return {
        type: actions.SET_INGREDIENTS,
        payload: payload
    }
}
export const setTotalPrice = payload => {
    return {
        type: actions.SET_TOTALPRICE,
        payload: payload
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
        .then(res => dispatch(setIngredients({ingredients: res.data})))
        .catch(err => dispatch(initIngredientsFailed()));
    }
}

export const initIngredientsFailed = () => {
    return {
        type: actions.INIT_INGREDIENTS_FAILED
    }
}