import React, { Component } from 'react';
import Home from './Home';
import './App.css';
import 'antd/dist/antd.css';
import { BrowserRouter as Router,Route} from "react-router-dom";
import PostsContainer from '../containers/PostsContainer';
import PostDetailContainer from '../containers/PostDetailContainer';
import ProductsContainer from '../containers/ProductsContainer';
import ProductDetailContainer from '../containers/ProductDetailContainer';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/products" component={ProductsContainer} />
        <Route exact path="/forum" component={PostsContainer} />
        <Route exact path="/products/:id" component={ProductDetailContainer} />
        <Route exact path="/forum/:id" component={PostDetailContainer} />



    </div>
        </Router>    
</div>
    );
  }
}

export default App;