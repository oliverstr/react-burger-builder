import React, { PureComponent } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import axios from '../../axios-orders';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

class Checkout extends PureComponent {

    state = { 
        purchase: {
            customer: {
                address: {
                    country: null,
                    street: null,
                    zipCode: null
                },
                email: null,
                name: null,
            },
            deliveryMethod: null,
            ingredients: {
                bacon: 0,
                cheese: 0,
                meat: 0,
                salad: 0,
            },
            price: 0
        }
    };

    componentDidMount(){
        const id = this.props.match.params.id;
        if(id){
            axios.get('/orders/' + id + '.json')
            .then(res => {
                if(res.data){
                    this.setState({ purchase: res.data })
                }
            });
        }
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack()
    }


    render() { 
        console.log(this.props);
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.purchase.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                />
            </div>
        );
    }
}
 
export default WithErrorHandler(Checkout, axios);