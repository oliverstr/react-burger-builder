import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import { connect } from 'react-redux'; 
import * as actions from '../../store/actions/burger';

class BurgerBuilder extends Component{

    state = {
        purchasing: false
    }

    componentDidMount(){
        this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients) {
        let sum = 0;
        for ( let key in ingredients ){
            sum += ingredients[key];
        }
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    // continuePurchase = () => {

    //     const queryParams = [];
    //     for (const key in  this.props.ingredients ){
    //         queryParams.push(encodeURIComponent(key) + '=' + encodeURIComponent(this.props.ingredients[key]))
    //     }
    //     queryParams.push('&price=' + this.props.totalPrice);
    //     this.props.history.push({ 
    //         pathname: '/checkout',
    //         search: '?' + queryParams.join('&')
    //     });
        

    // }
    continuePurchase = () => {
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {...this.props.ingredients}
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.props.error ? <p style={{ textAlign: 'center' }}>Ingredients couldn't be loaded.</p> : <Spinner />

        if (this.props.ingredients) {
            burger = 
            <Fragment>
                <Burger ingredients={this.props.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.props.onAddIngredient}
                    ingredientRemoved={this.props.onRemoveIngredient}
                    disabled={disabledInfo}
                    purchasable={this.updatePurchaseState(this.props.ingredients)}
                    purchase={this.purchaseHandler}
                    price={this.props.totalPrice}/>
            </Fragment>

            orderSummary = 
            <OrderSummary 
                ingredients={this.props.ingredients}
                cancelPurchase={this.purchaseCancelHandler}
                continuePurchase={this.continuePurchase}
                price={this.props.totalPrice}/>
        }

        // if (this.state.loading) {
        //     orderSummary = <Spinner />
        // }

        return (
            <Fragment>
                <Modal visible={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.br.ingredients, 
        totalPrice: state.br.totalPrice,
        error: state.br.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (type) => dispatch(actions.addIngredient({ type })),
        onRemoveIngredient: (type) => dispatch(actions.removeIngredient({ type })),
        onSetIngredients: (ingredients) => dispatch(actions.setIngredients({ ingredients })),
        onInitIngredients: () => dispatch(actions.initIngredients())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));