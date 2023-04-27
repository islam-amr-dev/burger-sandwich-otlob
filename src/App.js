import React, { Component } from 'react';
import { Route,Switch } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/Checkout/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders'


class App extends Component {
  render () {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path = "/checkout" component ={ Checkout } />
            <Route exact path = "/orders" component = {Orders} />
            <Route exact path = "/" component = {BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
