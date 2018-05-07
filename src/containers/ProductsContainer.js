import { connect } from 'react-redux'
import {fetchproducts } from '../actions'
import Products from '../components/Products';


const mapStateToProps = state => (
    {
    products: state.products,
    isLoading:state.itemIsLoading
  })

const mapDispatchToProps = (dispatch) => ({
  fetchproducts: () =>dispatch(fetchproducts()),
  })

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Products)
  