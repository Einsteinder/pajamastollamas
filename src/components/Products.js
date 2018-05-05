import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {  Link } from "react-router-dom";
import AppLayout from './AppLayout';

class Products extends Component {
componentDidMount(){
    this.props.fetchProducts()
}
  render() {
    return (
        <AppLayout content={    <div style={{ display:"flex", flexWrap:"wrap",justifyContent:"space-around", background: '#fff', padding: 24, minHeight: 280 }}>
 
        
 {this.props.isLoading ? (<p>Loading...</p>) : this.props.products.map(product => 
 
 <div className="card" key={product.id} style={{width: "30rem"}}>
<img className="card-img-top" src={product.imgURL} style={{width: "100%"}} alt={product.name}/>
<div className="card-body">
<h5 className="card-title">{product.name}</h5>
<p className="card-text">${product.price}</p>
<Link className="btn btn-primary" to={`/products/${product.id}`}>Product Detail</Link>
</div>
</div>)}
  
  
  </div>}/>

    );
  }
}

export default Products;