import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Home, ProfileInfo} from './components/layout';
import { CurrentUser } from './components/containers';
import { Provider } from 'react-redux';
import store from './stores/store';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Main from './components/Main';

const initialStore = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

//window.__PRELOADED_STATE__

class App extends Component {

  render(){
    return(
      <Provider store={ store.configureStore(initialStore) }>
        <Router history={browserHistory}>
          <Route path='/' component={Main}>

            <IndexRoute component={Home} />
            <Route path='/profile/:username' component={ProfileInfo} />
            <Route path='/currentuser' component={CurrentUser} />

          </Route>
        </Router>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
