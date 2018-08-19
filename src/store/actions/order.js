import * as types from './actionsTypes';
import axios from '../../axios-orders';

export const placeOrder = (payload) => {
    return dispatch => {
        dispatch(initOrderPlacement());
        axios.post('/orders.json', payload.order)
            .then(res => {
                dispatch(placeOrderSuccess({ id: res.data.name, order: payload.order }))
            })
            .catch(err => dispatch(placeOrderFail({err})));
    }
}

const placeOrderSuccess = (payload) => {
    return {
        type: types.PLACE_ORDER_SUCCESS,
        payload
    }
}

const placeOrderFail = (payload) => {
    return {
        type: types.PLACE_ORDER_FAIL,
        payload
    }
}

const initOrderPlacement = () => {
    return {
        type: types.INIT_ORDER_PLACEMENT
    }
}

export const orderFetch = () => {
    return dispatch => {
        dispatch(initOrderPlacement());
        axios.get('/orders.json').then(res => {
            const fetchedOrders = [];
            for ( let key in res.data ){
                fetchedOrders.push({...res.data[key], id: key});
            }
            dispatch(fetchOrderSuccess({ orders: fetchedOrders }))
        })
        .catch(err => {
            dispatch(fetchOrderFail({err}));
        })
    }

}

const fetchOrderSuccess = (payload) => {
    return {
        type: types.FETCH_ORDER_SUCCESS,
        payload
    }
}

const fetchOrderFail = (payload) => {
    return {
        type: types.FETCH_ORDER_FAIL,
        payload
    }
}

