import { connect } from 'react-redux'
import Postdetail from '../components/Postdetail';
import {fetchPostComments, postPostComment, } from '../actions'


const mapStateToProps = (state,ownProps) => (
    {
    posts: state.posts,
    postId:ownProps.match.params.id,
    comments:state.comments
  })

  const mapDispatchToProps = (dispatch) => ({
    fetchPostComments: () =>dispatch(fetchPostComments()),
    postPostComment: (comment) =>dispatch(postPostComment(comment)),

  })


  export default connect(
    mapStateToProps,mapDispatchToProps
  )(Postdetail)
  