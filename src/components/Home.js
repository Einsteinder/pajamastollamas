import React, { Component } from 'react';
import Button from 'antd/lib/button';
import './App.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb,Carousel } from 'antd';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AppLayout from './AppLayout';
import { Container } from 'semantic-ui-react'

const { Header, Content, Footer } = Layout;

class Home extends Component {
    render() {
        return (
            <AppLayout content={
                <Container textAlign='center'>

                <Carousel autoplay>
    <div><img src={"https://d39rqydp4iuyht.cloudfront.net/store/product/165250/1000x1000/51810_MN.jpg"} />
</div>
    <div><img src={"https://d39rqydp4iuyht.cloudfront.net/store/product/191733/1000x1000/58818_Crop1.jpg"} />
</div>
    <div><img src={"https://d39rqydp4iuyht.cloudfront.net/store/product/190414/1000x1000/83200_MN.jpg"} />
</div>
    <div><img src={"https://d39rqydp4iuyht.cloudfront.net/store/product/194651/1000x1000/26498_LAB.jpg"} />
</div>
  </Carousel>                
  </Container >

                }/>

        );
    }
}

export default Home;