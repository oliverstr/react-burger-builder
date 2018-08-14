import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, Redirect, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/burger" component={BurgerBuilder} />
            <Route path="/checkout/:id" component={Checkout} />
            <Route path="/checkout" component={Checkout} />
            <Redirect from="/" to="/burger"/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
