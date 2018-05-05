import { connect } from 'react-redux'
import {fetchProducts } from '../actions'
import Products from '../components/Products';


const mapStateToProps = state => (
    {
    products: state.products,
    isLoading:state.itemIsLoading
  })

const mapDispatchToProps = (dispatch) => ({
    fetchProducts: () =>dispatch(fetchProducts()),
  })

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Products)
  