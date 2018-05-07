
import {Button,Container, Header,Comment,Form,Icon } from 'semantic-ui-react'
import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import AppLayout from './AppLayout';

class Postdetail extends Component {
    state={
        textarea:""
    }
    componentDidMount(){
        this.props.fetchPostComments()
    }
    handleChangeText=(e)=>{
        this.setState({textarea:e.target.value})
    }
    handleClick=()=>{
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
            parentId:this.props.postId,
            userId:"cuurentLoginUser",
            author:"Your Father",
            productId:this.props.productId,
            content:this.state.textarea,
            voteScore: -5,
            deleted: false,
            timestamp:datetime,
        }
        this.props.postPostComment(newComment)
        this.setState({textarea:""})
    }
    render() {

        return (
            <AppLayout content={ <Container text>
    <Header as='h2'>{this.props.posts.filter(post=>(post.id===this.props.postId)).map(post=>post.title)}</Header>
    <Header as='h4'>Author: {this.props.posts.filter(post=>(post.id===this.props.postId)).map(post=>post.author)}</Header>
    <p>{this.props.posts.filter(post=>(post.id===this.props.postId)).map(post=>post.content)}</p>
    <Comment.Group>

                <Icon name="like outline" color="blue" size="huge"/>
                <Icon name="dislike outline" size="huge"/>

<Header as='h3' dividing>Comments</Header>

    {this.props.comments.filter(comment=>comment.parentId===this.props.postId).map(review=>
    <Comment key={review.id} >
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

  <Form.TextArea onChange={this.handleChangeText}  value = {this.state.textarea}/>

  <Button onClick={this.handleClick }content='Add Comment' labelPosition='left' icon='edit' primary />
</Form>
</Comment.Group>
  
  </Container>}/>

        );
    }
}



export default Postdetail
