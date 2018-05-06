import { connect } from 'react-redux'
import {fetchProductComments,postProductComment} from '../actions'
import ProductDetail from '../components/ProductDetail';


const mapStateToProps = (state,ownProps) => (
    {
    products: state.products,
    productId:ownProps.match.params.id,
    comments:state.productComments
  })

  const mapDispatchToProps = (dispatch) => ({
    fetchProductComments: () =>dispatch(fetchProductComments()),
    postProductComment: (comment) =>dispatch(postProductComment(comment)),

  })


  export default connect(
    mapStateToProps,mapDispatchToProps
  )(ProductDetail)
  