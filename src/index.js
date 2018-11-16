import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import todoApp from './reducers'
import { createStore } from 'redux'
import App from './App';
// import { HashRouter} from 'react-router-dom'
import { BrowserRouter as Router} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'

import './css/normalize.css'


let store = createStore(todoApp)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
registerServiceWorker()
