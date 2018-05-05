import React, { Component } from 'react';
import Button from 'antd/lib/button';
import './App.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Navbar,Nav,NavItem,NavDropdown,MenuItem } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { itemsIsLoading } from '../actions';
import AppLayout from './AppLayout';

const { Header, Content, Footer } = Layout;

class Products extends Component {
componentDidMount(){
    this.props.fetchProducts()
}
  render() {
    return (
        <AppLayout content={    <div style={{ display:"flex", flexWrap:"wrap",justifyContent:"space-around", background: '#fff', padding: 24, minHeight: 280 }}>
 
        
 {this.props.isLoading ? (<p>Loading...</p>) : this.props.products.map(product => 
 
 <div class="card" style={{width: "30rem"}}>
<img class="card-img-top" src={product.imgURL} style={{width: "100%"}} alt="Card image cap"/>
<div class="card-body">
<h5 class="card-title">{product.name}</h5>
<p class="card-text">${product.price}</p>
<Link className="btn btn-primary" to={`/products/${product.id}`}>Product Detail</Link>
</div>
</div>)}
  
  
  </div>}/>

    );
  }
}

export default Products;