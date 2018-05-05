
import posts from './posts'
import comments from './comments'
import productComments from './productComments'
import {products,itemsIsLoading} from './products'


const initialState = {
posts:[],
comments:[],
productComments:[],
products:[],
itemsIsLoading:false
}




export default function combineReducers(state = initialState, action) {
  return {
    posts: posts(state.posts, action),
    comments:comments(state.comments, action),
    productComments:productComments(state.productComments,action),
    products:products(state.products,action),
    itemsIsLoading:itemsIsLoading(state.itemsIsLoading,action)
  }
}
