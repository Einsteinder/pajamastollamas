import { connect } from 'react-redux'
import {fetchPosts } from '../actions'
import Forum from '../components/Forum';


const mapStateToProps = state => (
    {
    posts: state.posts,
  })

const mapDispatchToProps = (dispatch) => ({
    fetchPosts: () =>dispatch(fetchPosts()),
  })

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Forum)
  