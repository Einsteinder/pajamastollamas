import React, { Component } from 'react';
import Button from 'antd/lib/button';
import './App.css';
import 'antd/dist/antd.css';
import { Popover,Layout, Menu, Breadcrumb } from 'antd';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './Login';
import Signup from './Signup';

const { Header, Content, Footer } = Layout;

class AppLayout extends Component {
    state = {
        login_visible: false,
        signup_visible: false,

      }
      hidesignin = () => {
        this.setState({
            signin_visible: false,
        });
      }
      handleVisibleChange = (login_visible) => {
        this.setState({ login_visible });
      }
      handleSingUpVisibleChange = (signup_visible) => {
        this.setState({ signup_visible });
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
                            <Popover
        content={<Login/>}
        title="Title"
        trigger="click"
        visible={this.state.login_visible}
        onVisibleChange={this.handleVisibleChange}
      >
      <NavItem eventKey={1} href="#">
                                    Login
    </NavItem>
      </Popover>
      <Popover
        content={<Signup/>}
        title="Title"
        trigger="click"
        visible={this.state.signup_visible}
        onVisibleChange={this.handleSingUpVisibleChange}
      >
      <NavItem eventKey={2} href="#">
                                    Sign up
    </NavItem>
      </Popover>       
                         
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <Content style={{ padding: '0 50px' }}>

                        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>{this.props.content}</div>
                    </Content>

                    <Footer style={{ textAlign: 'center' }}>
                        Pajamas to Llamas ©2018 Created by Cowboys of Gilead
  </Footer>
                </Layout>
            </div>
        );
    }
}

export default AppLayout;