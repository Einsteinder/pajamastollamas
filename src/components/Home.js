import React, { Component } from 'react';
import Button from 'antd/lib/button';
import './App.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const { Header, Content, Footer } = Layout;

class Home extends Component {
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

                        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Welcome to llamas' paradise!</div>
                    </Content>

                    <Footer style={{ textAlign: 'center' }}>
                        Pajamas to Llamas ©2018 Created by Cowboys of Gilead
  </Footer>
                </Layout>
            </div>
        );
    }
}

export default Home;