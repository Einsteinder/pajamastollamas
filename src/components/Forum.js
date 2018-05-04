import React, { Component } from 'react';
import Button from 'antd/lib/button';
import './App.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb,List, Avatar, Icon  } from 'antd';


import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const { Header, Content, Footer } = Layout;

/*
const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}
*/
const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class Forum extends Component {
    componentDidMount(){
       this.props.fetchPosts()
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
                                <NavItem eventKey={2}>
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

                        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                            
                            
                            
                            
                            
                        <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 3,
    }}
    dataSource={this.props.posts}
    renderItem={item => (
      <List.Item
        key={item.title}
        actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
      >
        <List.Item.Meta
          title={<a href={item.href}>{item.title}</a>}
          description={item.description}
        />
        {item.content}
      </List.Item>
    )}
  />
                            
                            
                            
                            
                            
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

export default Forum;