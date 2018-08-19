import React, { Component, Fragment } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/order';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    state = { 
        orders: [],
        loading: true
     }

    componentDidMount(){
        // axios.get('/orders.json').then(res => {
        //     this.setState({loading: false});
        //     const fetchedOrders = [];
        //     for ( let key in res.data ){
        //         fetchedOrders.push({...res.data[key], id: key});
        //     }
        //     this.setState({orders: fetchedOrders});
        // })
        // .catch(err => {
        //     this.setState({loading: false});
        // })
        this.props.onOrdersFetched();
        
    }

    render() { 
        return (
            <Fragment>
                {this.props.loading ? <Spinner /> : this.props.orders.map(order => (<Order key={order.id} order={order}/>))}
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.or.orders,
        loading: state.or.loading
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onOrdersFetched: () => dispatch(actions.orderFetch())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Orders, axios));