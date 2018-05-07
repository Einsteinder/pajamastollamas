import { connect } from 'react-redux'
import ElasticSearch from '../components/ElasticSearch';


const mapStateToProps = state => (
    {
    products: state.products,
  })


  export default connect(
    mapStateToProps,
    
  )(ElasticSearch)
  