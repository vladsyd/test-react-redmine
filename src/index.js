import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import LoginPage from './components/login/LoginPage';
import { App } from './components/App';

render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="login" />
        <Route exact path="/login" render={props => <LoginPage {...props} />} />
        <Route exact path="/app" render={props => <App {...props} />} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)