import { connect } from 'react-redux'
import {fetchPosts, postPost,handlelike } from '../actions'
import Forum from '../components/Forum';


const mapStateToProps = state => (
    {
    posts: state.posts,
  })

const mapDispatchToProps = (dispatch) => ({
    fetchPosts: () =>dispatch(fetchPosts()),
    postPost:(post)=>dispatch(postPost(post)),
    handlelike:(id)=>dispatch(handlelike(id))
  })

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Forum)
  