import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Candidates from './containers/Candidates/Candidates';

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/applications" component={Candidates} />
        <Route path="/" exact component={Candidates} />
        <Redirect to="/" />
      </Switch>
    );
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

export default App;
