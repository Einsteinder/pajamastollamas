import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Layout, Icon, Button, Form, Input, Popover } from 'antd';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Login from './Login';
import SearchContainer from '../containers/SearchContainer';
import SignupContainer from '../containers/SignupContainer'
import { connect } from 'react-redux'
import { postLogout,postProduct} from '../actions'
const FormItem = Form.Item;


const { Content, Footer } = Layout;

class AppLayout extends Component {
    state = {
        login_visible: false,
        signup_visible: false,
        productTitle:"",
        productPrice:"",
        imageURL:""

    }
    hidesignin = () => {
        this.setState({
            signin_visible: false,
        });
    }
    handleAddProductVisibleChange = (visible) => {
        this.setState({ visible });
      }
      handleTitleChange = (e)=>{
          this.setState({productTitle:e.target.value})
      }
      handleContentChange = (e)=>{
        this.setState({productPrice:e.target.value})
      }
      handleURLChange = (e)=>{
        this.setState({imageURL:e.target.value})
      }
    handleVisibleChange = (login_visible) => {
        this.setState({ login_visible });
    }
    handleSingUpVisibleChange = (signup_visible) => {
        this.setState({ signup_visible });
    }
    handlelogout = () => {
        this.props.logout()
    }

    handleSubmit = (e)=>{
        e.preventDefault();

        
        const uuidv1 = require('uuid/v1');
        const newProduct = {
            id:uuidv1(),
            name:this.state.productTitle,
            price:this.state.productPrice,
            imgURL: this.state.imageURL,
 
 
        }
        this.props.postProduct(newProduct)
        this.setState({productPrice:"",productTitle:"",imgURL:"",visible:false})


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
                            <Nav >
                                <NavItem className="barfont" eventKey={1} href="/products">
                                    Products
                                </NavItem>
                                <NavItem className="barfont" eventKey={2} href="/forum">
                                    Forum
                                </NavItem>

                                <NavItem >
                                    <SearchContainer />
                                </NavItem>
                                {this.props.currentUser.admin &&
                                    <NavItem className="barfont" eventKey={3} href="/forum">
                                        <Popover
                                            content={
                                                <div style={{ width: "1000" }}>
                                                    <Form layout={'horizontal'} onSubmit={this.handleSubmit}>
                                                        <FormItem
                                                            label="Name"
                                                        >
                                                            <Input value={this.state.productTitle} onChange={this.handleTitleChange} placeholder="put the name of the product..." />
                                                        </FormItem>
                                                        <FormItem
                                                            label="Price"
                                                        >
                                                            <Input value={this.state.productPrice} onChange={this.handleContentChange} placeholder="add price for the product..."  />

                                                        </FormItem>
                                                        <FormItem
                                                            label="URL of the product image"
                                                        >
                                                            <Input value={this.state.imageURL} onChange={this.handleURLChange} placeholder="input the url of product picture..."  />

                                                        </FormItem>
                                                        <FormItem >
                                                            <Button type="primary" htmlType="submit">Add New Product</Button>
                                                        </FormItem>
                                                    </Form>
                                                </div>
                                            } placement="bottom"
                                            title="Add New Product"
                                            trigger="click"
                                            visible={this.state.visible}
                                            onVisibleChange={this.handleAddProductVisibleChange}
                                            size={"large"}
                                        >
                                            <Button type="primary" shape="circle" icon="plus" size={"large"} />
                                        </Popover>
                                    </NavItem>
                                }
                            </Nav>

                            {(Object.keys(this.props.currentUser).length !== 0) ?
                                <Nav pullRight>
                                    <Popover
                                        content={<Button onClick={this.handlelogout}>Logout</Button>
                                        }

                                    >
                                        <NavItem eventKey={1} >
                                            <Icon type="user" />
                                        </NavItem>
                                    </Popover></Nav>
                                :

                                <Nav pullRight>
                                    <Popover
                                        content={<Login />}
                                        title="Login"
                                        trigger="click"
                                        visible={this.state.login_visible}
                                        onVisibleChange={this.handleVisibleChange}
                                    >
                                        <NavItem className="barfont" eventKey={1} >
                                            Login
    </NavItem>
                                    </Popover>
                                    <Popover
                                        content={<SignupContainer />}
                                        title="Signup"
                                        trigger="click"
                                        visible={this.state.signup_visible}
                                        onVisibleChange={this.handleSingUpVisibleChange}
                                    >
                                        <NavItem className="barfont" eventKey={2} href="#">
                                            Sign up
    </NavItem>
                                    </Popover>

                                </Nav>

                            }

                        </Navbar.Collapse>
                    </Navbar>
                    <Content style={{ padding: '0 50px' }}>

                        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>{this.props.content}</div>
                    </Content>

                    <Footer style={{ textAlign: 'center' }} id="bottom">
                        Pajamas to Llamas ©2018 Created by Cowboys of Gilead
  </Footer>
                </Layout>
            </div>
        );
    }
}



const mapStateToProps = (state) => (
    {
        currentUser: state.users.currentUser,
    })
const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(postLogout()),
    postProduct:(product)=>dispatch(postProduct(product))

})




export default connect(
    mapStateToProps, mapDispatchToProps
)(AppLayout)
