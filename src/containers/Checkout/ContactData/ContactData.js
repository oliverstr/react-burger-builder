import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner'
import WithError from '../../../hoc/WithErrorHandler/WithErrorHandler';
import { connect } from 'react-redux';

class ContactData extends Component {

    state = { 
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({loading: true});

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Oliver',
                email: 'test@test.com',
                address: {
                    street: 'Test Street',
                    zipCode: '12345',
                    country: 'Brazil'
                },
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(data => {
                this.setState({loading: false})
                this.props.history.push('/burger');
            })
            .catch(err => this.setState({loading: false}));
    }

    render() {
        let form = (
            <form>
                <input type="text" name="name" placeholder="Your name"/>
                <input type="email" name="email" placeholder="Your email"/>
                <input type="text" name="street" placeholder="Your street"/>
                <input type="text" name="postalCode" placeholder="Your postal code"/>
                <Button buttonType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={styles.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
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
 
export default connect(mapStateToProps)(WithError(ContactData, axios));