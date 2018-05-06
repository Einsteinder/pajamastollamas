import { connect } from 'react-redux'
import {fetchProducts } from '../actions'
import ElasticSearch from '../components/ElasticSearch';


const mapStateToProps = state => (
    {
    products: state.products,
  })

const mapDispatchToProps = (dispatch) => ({
    fetchProducts: () =>dispatch(fetchProducts()),
  })

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ElasticSearch)
  