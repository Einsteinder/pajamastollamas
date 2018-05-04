
import { Grid, Image,Container, Header,Comment,Form,Ref } from 'semantic-ui-react'
import React, { Component } from 'react';
import Button from 'antd/lib/button';
import './App.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const { Content, Footer } = Layout;

class Postdetail extends Component {
    componentDidMount(){
        this.props.fetchPostComments()
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



    <Container text>
    <Header as='h2'>{this.props.posts.filter(post=>(post.id===this.props.postId)).map(post=>post.title)}</Header>
    <Header as='h4'>Author: {this.props.posts.filter(post=>(post.id===this.props.postId)).map(post=>post.author)}</Header>
    <p>{this.props.posts.filter(post=>(post.id===this.props.postId)).map(post=>post.content)}</p>
    <Comment.Group>


<Header as='h3' dividing>Comments</Header>

    {this.props.comments.filter(comment=>comment.parentId===this.props.postId).map(review=>
    <Comment>
  <Comment.Content>
    <Comment.Author>{review.author}</Comment.Author>
    <Comment.Metadata>
      <div>{review.timestamp}</div>
    </Comment.Metadata>
    <Comment.Text>
        {review.content}
    </Comment.Text>
  </Comment.Content>
</Comment>)}




<Form reply>
<Ref innerRef={this.handleRef}>

  <Form.TextArea onChange={this.handleChangeText} />
  </Ref>

  <Button onClick={this.handleClick }content='Add Comment' labelPosition='left' icon='edit' primary />
</Form>
</Comment.Group>
  
  </Container>





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



export default Postdetail
