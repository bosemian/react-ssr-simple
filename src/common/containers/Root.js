import React, { Component } from 'react'
import { Provider } from 'react-redux';

import routes from '../routes';
import configureStore from '../store/configureStore'

if (process.env.BROWSER) {
  require('bulma/css/bulma.css')
}

class Root extends Component {
  render() {
    const { history, initialState  } = this.props
    const store = configureStore(history, initialState )
    return (   
      <Provider store={store} key='provider'>
        { routes(store, history) }
      </Provider>
    )
  }
}
export default Root