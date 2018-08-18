import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import { connect } from 'react-redux'; 
import * as actions from '../../store/actions';

class BurgerBuilder extends Component{

    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        axios.get('/ingredients.json')
            .then(res => {
                // this.setState({ ingredients: res.data });
                this.props.onSetIngredients(res.data);
            })
            .catch(err => this.setState({error: true}));
    }

    updatePurchaseState(ingredients) {
        let sum = 0;
        for ( let key in ingredients ){
            sum += ingredients[key];
        }
        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        this.props.onAddIngredient(type);
        this.updatePurchaseState(this.props.ingredients);
    }

    removeIngredientHandler = (type) => {
            this.props.onRemoveIngredient(type);
            this.updatePurchaseState(this.props.ingredients);
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

        let burger = this.state.error ? <p style={{ textAlign: 'center' }}>Ingredients couldn't be loaded.</p> : <Spinner />

        if (this.props.ingredients) {
            burger = 
            <Fragment>
                <Burger ingredients={this.props.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
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

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

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
        totalPrice: state.br.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (type) => dispatch({type: actions.ADD_INGREDIENT, payload: { type }}),
        onRemoveIngredient: (type) => dispatch({type: actions.REMOVE_INGREDIENT, payload: { type }}),
        onSetIngredients: (ingredients) => dispatch({type: actions.SET_INGREDIENTS, payload: { ingredients }}),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));