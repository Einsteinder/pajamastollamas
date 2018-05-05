import React, { Component } from 'react';
import Button from 'antd/lib/button';
import './App.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AppLayout from './AppLayout';

const { Header, Content, Footer } = Layout;

class Home extends Component {
    render() {
        return (
            <AppLayout content={<div>Welcome to llamas' paradise!</div>}/>

        );
    }
}

export default Home;