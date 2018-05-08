import { connect } from 'react-redux'
import WrappedSignupForm from '../components/Signup';
import {postSignup } from '../actions'

const mapStateToProps = state => (
    {
    products: state.products,
  })

  const mapDispatchToProps = (dispatch) => ({
    postSignup: (user) =>dispatch(postSignup(user)),
    })

  export default connect(
    mapStateToProps,mapDispatchToProps
    
  )(WrappedSignupForm)
  