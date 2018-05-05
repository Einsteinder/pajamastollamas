import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Navbar,Nav,NavItem,NavDropdown,MenuItem } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button, Comment, Form, Header ,Ref,Container} from 'semantic-ui-react'
import AppLayout from './AppLayout';

const {  Content, Footer } = Layout;

class ProductDetail extends Component {

state={
    textarea:""
}
componentDidMount(){
    this.props.fetchProductComments()
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
        
        const uuidv1 = require('uuid/v1');
        const newComment = {
            id:uuidv1(),
            userId:"cuurentLoginUser",
            author:"Your Father",
            productId:this.props.productId,
            content:this.state.textarea,
            timestamp:datetime,
            rate:5
        }
        this.props.postProductComment(newComment)
        this.setState({textarea:""})
        

    }
  render() {

    return (
        <AppLayout content={    <div style={{ display:"flex", flexWrap:"wrap",justifyContent:"space-around", background: '#fff', padding: 24, minHeight: 280 }}>
    {this.props.products.filter(product=>product.id===this.props.match.params.id).map(product=>
    
    <div>

    <img src={product.imgURL} style={{height:"800",width:"800"}}/>
    <Container text>

    <Comment.Group>


    <Header as='h3' dividing>Comments</Header>

        {this.props.comments.filter(comment =>comment.productId===product.id).map(review=>
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

      <Form.TextArea onChange={this.handleChangeText} value={this.state.textarea} />

      <Button onClick={this.handleClick }content='Add Comment' labelPosition='left' icon='edit' primary />
    </Form>
  </Comment.Group>
  </Container>

    
</div>

    )}


        
        </div>}/>

    );
  }
}

export default ProductDetail;