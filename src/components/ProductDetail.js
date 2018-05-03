import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Navbar,Nav,NavItem,NavDropdown,MenuItem } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button, Comment, Form, Header } from 'semantic-ui-react'

const {  Content, Footer } = Layout;

class ProductDetail extends Component {

    state={
        currentUser:"u1",
        textarea:"",
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

    handleChangeText = event => {
        this.setState({ textarea: event.target.value });
      }

    handleClick=(event)=>{
        var currentdate = new Date(); 
        var datetime = currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " @ "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
        let newProducts = []
        this.state.products.map(product=>(product.id===this.props.match.params.id)?
        newProducts.push({...product,reviews:[...product.reviews,{id:this.props.match.params.id,
                                                userId:this.state.currentUser,
                                                content:this.state.textarea,
                                                timestamp:datetime,
                                                rate:5
        }]}):newProducts.push(product))
        this.setState({products:newProducts})
        this.setState({textarea:""})
        this.refs.textInput.value=" "

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
    {this.state.products.filter(product=>product.id===this.props.match.params.id).map(product=>
    
    <div>
    <img src={product.imgURL}/>
    <Comment.Group>


    <Header as='h3' dividing>Comments</Header>

        {product.reviews.map(review=>
        <Comment>
      <Comment.Content>
        <Comment.Author>{review.userId}</Comment.Author>
        <Comment.Metadata>
          <div>{review.timestamp}</div>
        </Comment.Metadata>
        <Comment.Text>
            {review.content}
        </Comment.Text>
      </Comment.Content>
    </Comment>)}
    



    <Form reply>
      <Form.TextArea onChange={this.handleChangeText} />
      <Button onClick={this.handleClick }content='Add Comment' labelPosition='left' icon='edit' primary />
    </Form>
  </Comment.Group>
    
</div>

    )}

        
        
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

export default ProductDetail;