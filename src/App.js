import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { inject, observer } from 'mobx-react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Upload from './components/Upload';
import NoMatch from './components/NoMatch';
import EPGP from './components/EPGP';
import Navbar from './components/Head'; 

@inject('rootStore')
@observer
class App extends Component {
    render() {
      return (
        <Router basename="/">
          <div className="App" data-test="component-app">
            <Navbar/>
            <Switch>
              <Route exact path="/" component={EPGP} />
              <Route exact path="/upload" component={Upload} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      );
  }
}

export default hot(module)(App);
