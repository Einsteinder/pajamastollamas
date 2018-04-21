import React, { Component } from 'react';
import Button from 'antd/lib/button';
import './App.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Navbar,Nav,NavItem,NavDropdown,MenuItem } from 'react-bootstrap';

const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <div className="App">
      <Layout className="layout">
  
  <Navbar inverse collapseOnSelect>
<Navbar.Header>
  <Navbar.Brand>
    <a href="#brand">Pajamas to Llamas</a>
  </Navbar.Brand>
  <Navbar.Toggle />
</Navbar.Header>
<Navbar.Collapse>
  <Nav>
    <NavItem eventKey={1} href="#">
      Products
    </NavItem>
    <NavItem eventKey={2} href="#">
      Forum
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
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>List</Breadcrumb.Item>
      <Breadcrumb.Item>App</Breadcrumb.Item>
    </Breadcrumb>
    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Content</div>
  </Content>

  <Footer style={{ textAlign: 'center' }}>
    Pajamas to Llamas ©2018 Created by Cowboys of Gilead
  </Footer>
</Layout>      </div>
    );
  }
}

export default App;