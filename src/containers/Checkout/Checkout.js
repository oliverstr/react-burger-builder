import React, { PureComponent } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import axios from '../../axios-orders';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends PureComponent {

    // state = { 
    //     ingredients: null,
    //     totalPrice: 0
    // };

    // componentWillMount(){
    //     const urlParams = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for (const param of urlParams.entries()){
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = + param[1]; // The "+" converts to number
    //         }
    //     }
    //     this.setState({ ingredients: ingredients, totalPrice: price });
    // }
    componentWillMount() {
        if(!this.props.ingredients){
            this.props.history.push('/burger');
        }
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinueHandler = () => {
        this.props.history.push('/checkout/contact-data');
    }


    render() { 
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ingredients}
                    totalPrice={this.props.totalPrice}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinue={this.checkoutContinueHandler}
                />
                <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.br.ingredients,
        totalPrice: state.br.totalPrice,
    };
}
 
export default connect(mapStateToProps)(WithErrorHandler(Checkout, axios));