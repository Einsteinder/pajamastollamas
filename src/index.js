
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore ,applyMiddleware,compose} from 'redux'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

import createHistory from 'history/createBrowserHistory'

const history = createHistory()

const middleware = routerMiddleware(history)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const store = createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(thunk,middleware)
    )
)

ReactDOM.render(
    <Provider store={store}> 
    <ConnectedRouter history={history}>

    <App />  
    </ConnectedRouter>

    </Provider>

, document.getElementById('container'));
          
registerServiceWorker();

