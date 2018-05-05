import React, { Component } from 'react';
import Button from 'antd/lib/button';
import './App.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Navbar,Nav,NavItem,NavDropdown,MenuItem } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { itemsIsLoading } from '../actions';

const { Header, Content, Footer } = Layout;

class Products extends Component {
componentDidMount(){
    this.props.fetchProducts()
}
  render() {
    return (
      <div className="App">
      <Layout className="layout">
  
  <Navbar inverse collapseOnSelect>
<Navbar.Header>
  <Navbar.Brand>
    <Link className="nav-link" to="/">Pajamas to Llamas</Link>

  </Navbar.Brand>
  <Navbar.Toggle />
</Navbar.Header>
<Navbar.Collapse>
  <Nav>
    <NavItem eventKey={1}>
      
      <Link className="nav-link" to="/products">Products</Link>

    </NavItem>
    <NavItem eventKey={2} href="#">
    <Link className="nav-link" to="/forum">Forum</Link>
    </NavItem>
  </Nav>
  <Nav pullRight>
    <NavItem eventKey={1} href="#">
      Login
    </NavItem>
    <NavItem eventKey={2} href="#">
      Sign up
    </NavItem>
  </Nav>
</Navbar.Collapse>
</Navbar>
<Content style={{ padding: '0 50px' }}>

    <div style={{ display:"flex", flexWrap:"wrap",justifyContent:"space-around", background: '#fff', padding: 24, minHeight: 280 }}>
 
        
       {this.props.isLoading ? (<p>Loading...</p>) : this.props.products.map(product => 
       
       <div class="card" style={{width: "30rem"}}>
 <img class="card-img-top" src={product.imgURL} style={{width: "100%"}} alt="Card image cap"/>
 <div class="card-body">
   <h5 class="card-title">{product.name}</h5>
   <p class="card-text">${product.price}</p>
   <Link className="btn btn-primary" to={`/products/${product.id}`}>Product Detail</Link>
 </div>
   </div>)}
        
        
        </div>
  </Content>

  <Footer style={{ textAlign: 'center' }}>
    Pajamas to Llamas ©2018 Created by Cowboys of Gilead
  </Footer>
</Layout>      
</div>
    );
  }
}

export default Products;