import React, { Component } from 'react';
import Button from 'antd/lib/button';
import './App.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Navbar,Nav,NavItem,NavDropdown,MenuItem } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const { Header, Content, Footer } = Layout;

class Products extends Component {
    state={
        products:[{
            imgURL:"https://d39rqydp4iuyht.cloudfront.net/store/product/165250/1000x1000/51810_MN.jpg",
            name:"Loving Paws",
            price:10,
            id:"p1",
            reviews:[{
                id:"r1",
                userId:"u1",
                content:"Love these pjs. Warm, comfortable and wonderful for lounging or sleeping. Highly recommend.",
                timestamp:"February 8, 2018",
                rate:4
            },
            {
                id:"r2",
                userId:"u2",
                content:"Bought these as a gift for my mother-in-law. She loved them. Says they're soft & comfy & keep her warm. She is always cold at night but not anymore. I have purchased several items and am pleased with them all.",
                timestamp:"January 13, 2018",
                rate:5
            }
        ]
        },
        {
            imgURL:"https://d39rqydp4iuyht.cloudfront.net/store/product/191733/1000x1000/58818_Crop1.jpg",
            name:"All Over Paws Plush Lounge Pants",
            price:11,
            id:"p2",
            reviews:[{
                id:"r3",
                userId:"u2",
                content:"Love these pjs. Warm, comfortable and wonderful for lounging or sleeping. Highly recommend.",
                timestamp:"February 8, 2018",
                rate:4
            },
            {
                id:"r4",
                userId:"u2",
                content:"Bought these as a gift for my mother-in-law. She loved them. Says they're soft & comfy & keep her warm. She is always cold at night but not anymore. I have purchased several items and am pleased with them all.",
                timestamp:"January 13, 2018",
                rate:5
            }
        ]
        },
        {
            imgURL:"https://d39rqydp4iuyht.cloudfront.net/store/product/190414/1000x1000/83200_MN.jpg",
            name:"Super Cozy™ Sherbet Pets Slipper Booties",
            price:12,
            id:"p3",
            reviews:[{
                id:"r5",
                userId:"u1",
                content:"Love these pjs. Warm, comfortable and wonderful for lounging or sleeping. Highly recommend.",
                timestamp:"February 8, 2018",
                rate:4
            },
            {
                id:"r6",
                userId:"u3",
                content:"Bought these as a gift for my mother-in-law. She loved them. Says they're soft & comfy & keep her warm. She is always cold at night but not anymore. I have purchased several items and am pleased with them all.",
                timestamp:"January 13, 2018",
                rate:5
            }
        ]
        },
        {
            imgURL:"https://d39rqydp4iuyht.cloudfront.net/store/product/194651/1000x1000/26498_LAB.jpg",
            name:"Purple Paw Women's Casual Shorts",
            price:15,
            id:"p4",
            reviews:[{
                id:"r7",
                userId:"u1",
                content:"Love these pjs. Warm, comfortable and wonderful for lounging or sleeping. Highly recommend.",
                timestamp:"February 8, 2018",
                rate:4
            },
            {
                id:"r8",
                userId:"u2",
                content:"Bought these as a gift for my mother-in-law. She loved them. Says they're soft & comfy & keep her warm. She is always cold at night but not anymore. I have purchased several items and am pleased with them all.",
                timestamp:"January 13, 2018",
                rate:5
            }
        ]
        },
        {
            imgURL:"https://d39rqydp4iuyht.cloudfront.net/store/product/190623/1000x1000/85382_MN.jpg",
            name:"Rainbow Paws Thermal Long Sleeve Top",
            price:5,
            id:"p5",
            reviews:[{
                id:"r9",
                userId:"u1",
                content:"Love these pjs. Warm, comfortable and wonderful for lounging or sleeping. Highly recommend.",
                timestamp:"February 8, 2018",
                rate:4
            },
            {
                id:"r10",
                userId:"u3",
                content:"Bought these as a gift for my mother-in-law. She loved them. Says they're soft & comfy & keep her warm. She is always cold at night but not anymore. I have purchased several items and am pleased with them all.",
                timestamp:"January 13, 2018",
                rate:5
            }
        ]
        }]
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
    <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
      <MenuItem eventKey={3.1}>Action</MenuItem>
      <MenuItem eventKey={3.2}>Another action</MenuItem>
      <MenuItem eventKey={3.3}>Something else here</MenuItem>
      <MenuItem divider />
      <MenuItem eventKey={3.3}>Separated link</MenuItem>
    </NavDropdown>
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
        
        
       {this.state.products.map(product => 
       
        <div class="card" style={{width: "30rem"}}>
  <img class="card-img-top" src={product.imgURL} style={{width: "100%"}} alt="Card image cap"/>
  <div class="card-body">
    <h5 class="card-title">{product.name}</h5>
    <p class="card-text">${product.price}</p>
    <a href="#" class="btn btn-primary">Product Detail</a>
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