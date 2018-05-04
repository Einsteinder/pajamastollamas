import { connect } from 'react-redux'
import Forum from '../components/Forum';
import Postdetail from '../components/Postdetail';
import {fetchPostComments} from '../actions'


const mapStateToProps = (state,ownProps) => (
    {
    posts: state.posts,
    postId:ownProps.match.params.id,
    comments:state.comments
  })

  const mapDispatchToProps = (dispatch) => ({
    fetchPostComments: () =>dispatch(fetchPostComments()),
  })


  export default connect(
    mapStateToProps,mapDispatchToProps
  )(Postdetail)
  