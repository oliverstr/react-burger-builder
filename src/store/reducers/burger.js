import * as actions from '../actions/actionsTypes';

const initialState = {
    ingredients: null,
    totalPrice: 0,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 1
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        // SET INGREDIENTS

        case actions.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.payload.ingredients,
                totalPrice: 0,
                error: false
            }

        // SET TOTAL_PRICE

        case actions.SET_TOTALPRICE:
            return {
                ...state,
                totalPrice: action.payload.totalPrice
            }

        // ADD INGREDIENT

        case actions.ADD_INGREDIENT:
            const oldCount = state.ingredients[action.payload.type];
            const updatedCount = oldCount + 1;
            const updatedIngredients = { ...state.ingredients
            }
            updatedIngredients[action.payload.type] = updatedCount;

            const priceAddition = INGREDIENT_PRICES[action.payload.type];
            const oldPrice = state.totalPrice;
            const newPrice = oldPrice + priceAddition;

            return {
                ...state,
                totalPrice: newPrice,
                ingredients: updatedIngredients
            };

        // REMOVE INGREDIENT

        case actions.REMOVE_INGREDIENT:
            const oldCount2 = state.ingredients[action.payload.type];
            if (oldCount2 > 0) {
                const updatedCount = oldCount2 - 1;
                const updatedIngredients = { ...state.ingredients
                }
                updatedIngredients[action.payload.type] = updatedCount;

                const priceDeduction = INGREDIENT_PRICES[action.payload.type];
                const oldPrice = state.totalPrice;
                const newPrice = oldPrice - priceDeduction;

                return {
                    ...state,
                    totalPrice: newPrice,
                    ingredients: updatedIngredients
                }
            }
            return state;

        // INIT INGREDIENTS FAILED

        case actions.INIT_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            };

        default:
            return state;
    }
}

export default rootReducer;