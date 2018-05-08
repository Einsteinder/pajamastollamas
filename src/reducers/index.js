
import posts from './posts'
import comments from './comments'
import productComments from './productComments'
import {products,itemsIsLoading} from './products'
import { users } from './users';
import { routerReducer } from 'react-router-redux'


const initialState = {
posts:[],
comments:[],
productComments:[],
products:[],
itemsIsLoading:false,
users:{users:[ {email:"www@www.www",
  password:"www",
  confirm:"www",
  nickname:"www",
  admin:true
}],
currentUser:{},

}

}


export default function combineReducers(state = initialState, action) {
  return {
    posts: posts(state.posts, action),
    comments:comments(state.comments, action),
    productComments:productComments(state.productComments,action),
    products:products(state.products,action),
    itemsIsLoading:itemsIsLoading(state.itemsIsLoading,action),
    users:users(state.users,action),
    router: routerReducer

  }
}
