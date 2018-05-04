
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore ,applyMiddleware,compose} from 'redux'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const store = createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(thunk)
    )
)

ReactDOM.render(
    <Provider store={store}> 
    <App />  
    </Provider>

, document.getElementById('container'));
          
registerServiceWorker();

