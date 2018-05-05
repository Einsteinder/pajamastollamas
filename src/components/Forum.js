import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {Form,Input,Popover, Button, List, Icon  } from 'antd';
import { Link } from "react-router-dom";
import AppLayout from './AppLayout';
const { TextArea } = Input;
const FormItem = Form.Item;


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

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class Forum extends Component {
    state = {
        postTitle:"",
        postContent:"",
        visible: false,
      }
      hide = () => {
        this.setState({
          visible: false,
        });
      }
      handleSubmit = (e)=>{
        e.preventDefault();
        var currentdate = new Date(); 
        var datetime = currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " @ "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
        
        const uuidv1 = require('uuid/v1');
        const newPost = {
            id:uuidv1(),
            userId:"cuurentLoginUser",
            author:"Your Father",
            timestamp:datetime,
            title:this.state.postTitle,
            content:this.state.postContent,
            voteScore: 0,
            deleted: false,
            commentCount:0
 
        }
        this.props.postPost(newPost)
        this.setState({postTitle:"",postContent:"",visible:false})


      }
      handleVisibleChange = (visible) => {
        this.setState({ visible });
      }
      handleTitleChange = (e)=>{
          this.setState({postTitle:e.target.value})
      }
      handleContentChange = (e)=>{
        this.setState({postContent:e.target.value})
    }
    componentDidMount(){
       this.props.fetchPosts()
    }
    render() {

        return (
            <AppLayout content={<div>                   <Popover
        content={    
            <div style={{width:"1000"}}> 
            <Form layout={'horizontal'} onSubmit={this.handleSubmit}>
          <FormItem
    
            
          >
          </FormItem>
          <FormItem
            label="Title"
         

          >
            <Input value = {this.state.postTitle} onChange={this.handleTitleChange} placeholder="give a name for your article..." />
          </FormItem>
          <FormItem
            label="Content"
          >
            <TextArea value = {this.state.postContent} onChange={this.handleContentChange}placeholder="write what you think..." autosize={{ minRows: 2, maxRows: 12 }} />

          </FormItem>
          <FormItem >
            <Button type="primary" htmlType="submit">Publish</Button>
          </FormItem>
        </Form>
        </div>
}       placement="bottom"
        title="Add New Post"
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        size={"large"}
      >
      <Button type="primary"  shape="circle" icon="plus" size={"large"} />
      </Popover>      
                            
         
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
       

          title={ <Link to={`/forum/${item.id}`}>{item.title}</Link>}
          description={item.description}
        />
        {item.content.substring(0,130)}
        ...
      </List.Item>
    )}
  /></div>}/>
  
        );
    }
}

export default Forum;