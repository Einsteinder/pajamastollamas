import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {List, Icon  } from 'antd';
import { Link } from "react-router-dom";
import { HashLink as LinkH } from 'react-router-hash-link';
import {handlelike } from '../actions'

import { connect } from 'react-redux'

const IconText = ({ type, text }) => (
  <p>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </p>
);



class WrapLikething extends Component {
    handlethislike = () =>{
      this.props.handlelike(this.props.item.id)
      console.log(this.props.item.id)
    }
    render() {
      const item = this.props.item

        return (
        

      <List.Item
        key={item.id}
        actions={[<a onClick={this.handlethislike}><IconText  type="like-o" text={item.voteScore} /></a>, <LinkH to={`/forum/${item.id}#bottom`}><IconText type="message" text={item.commentCount} /></LinkH>]}
      >
        <List.Item.Meta
       

          title={ <Link to={`/forum/${item.id}`}>{item.title}</Link>}
          description={item.description}
        />
        {item.content.substring(0,130)}
        
        ...
      </List.Item>

  
        );
    }
}





const mapStateToProps = (state,ownProps) => (
    {
    item: ownProps.post,
  })

  const mapDispatchToProps = (dispatch) => ({
    handlelike:(id)=>dispatch(handlelike(id))

  })


  export default connect(
    mapStateToProps,mapDispatchToProps
  )(WrapLikething)
  