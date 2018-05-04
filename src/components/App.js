import React, { Component } from 'react';
import Home from './Home';
import Products from './Products';
import Button from 'antd/lib/button';
import './App.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Navbar,Nav,NavItem,NavDropdown,MenuItem } from 'react-bootstrap';
import { BrowserRouter as Router,Route} from "react-router-dom";
import Forum from './Forum';
import ProductDetail from './ProductDetail';
import PostsContainer from '../containers/PostsContainer';
import Postdetail from './Postdetail';
import PostDetailContainer from '../containers/PostDetailContainer';

const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/forum" component={PostsContainer} />
        <Route exact path="/products/:id" component={ProductDetail} />
        <Route exact path="/forum/:id" component={PostDetailContainer} />



    </div>
        </Router>    
</div>
    );
  }
}

export default App;