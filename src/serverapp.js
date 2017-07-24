import React, { Component } from 'react';
import { Provider } from 'react-redux';
 import Main from './components/Main';

class App extends Component {

  render(){
    return(
      <Provider store={this.props.route.initial}>
        <Main {...this.props} />
      </Provider>
    )
  }
}

export default App;
