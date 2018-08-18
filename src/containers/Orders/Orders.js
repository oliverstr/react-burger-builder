import React, { Component, Fragment } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

class Orders extends Component {
    state = { 
        orders: [],
        loading: true
     }

    componentDidMount(){
        axios.get('/orders.json').then(res => {
            this.setState({loading: false});
            const fetchedOrders = [];
            for ( let key in res.data ){
                fetchedOrders.push({...res.data[key], id: key});
            }
            this.setState({orders: fetchedOrders});
        })
        .catch(err => {
            this.setState({loading: false});
        })
        
    }

    render() { 
        return (
            <Fragment>
                {this.state.orders.map(order => (<Order key={order.id} order={order}/>))}
            </Fragment>
        );
    }
}

export default WithErrorHandler(Orders, axios);