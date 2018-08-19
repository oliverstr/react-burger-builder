import * as actions from '../actions/actionsTypes';

const initialState = {
    orders: [],
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actions.PLACE_ORDER_SUCCESS:
            const newOrder = {
                ...action.payload.order,
                id: action.payload.id
            }
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder)
            }

        case actions.PLACE_ORDER_FAIL:
            return {
                ...state,
                loading: false
            }

        case actions.INIT_ORDER_PLACEMENT:
            return {
                ...state,
                loading: true
            }

        case actions.FETCH_ORDER_SUCCESS:
            return {
                ...state,
                orders: action.payload.orders,
                loading: false
            }

        case actions.FETCH_ORDER_FAIL:
            return {
                ...state,
                loading: false
            }

        default:
            return state;
    }
}

export default reducer;