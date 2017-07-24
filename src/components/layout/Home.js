import React, { Component } from 'react';
import {Comments , Zones, Account} from '../containers';

import styles from './styles';

class Home extends Component {
  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'>
            <Account />
            <Zones />
          </div>
          <div className='col-md-8'>
            <Comments />
          </div>
        </div>

      </div>
    )
  }
}


export default Home;
