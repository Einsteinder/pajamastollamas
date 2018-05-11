//import * as api from '../utils/api'
import { postAPost, postALike, postAPostComment, postAndLogout, postAProductComment, getProducts, getForumPosts, getForumComments, getProductComments, postlogin, postAProduct, postNewUser } from "../localApi";


let nextCommentId = 0



export const receivePosts = posts=>({
  type:'RECEIVE_POSTS',
  posts
})
export const receivePostComments = comments=>({
  type:'RECEIVE_POST_COMMENTS',
  comments
})

export function itemsHasErrored(bool) {
  return {
      type: 'ITEMS_HAS_ERRORED',
      hasErrored: bool
  };
}
export function itemsIsLoading(bool) {
  return {
      type: 'ITEMS_IS_LOADING',
      isLoading: bool
  };
}

export function addProductComment(comment) {
  return {
      type: 'ADD_PRODUCT_COMMENT',
      comment
  };
}


export function addPost(post) {
  return {
      type: 'ADD_POST',
      post
  };
}
export function addPostComment(comment) {
  return {
      type: 'ADD_POST_COMMENT',
      comment
  };
}

export function postPost(post) {

  
  return (dispatch)=>{

    var promise1 = postAPost ( post );
    promise1.then((response)=>{
      response.id = response._id;
      dispatch(addPost(response));

    })


};
}


export function addLike(id) {
  return {
      type: 'ADD_LIKE',
      id
  };
}



export function handlelike(id) {
  return (dispatch)=>{

    var promise1 = postALike (id);
    promise1.then((response)=>{

      dispatch(addLike(id));

    })


};
}

export function signup(user){
  return {
    type: 'SIGN_UP',
    user
};
}


export function login(user){
  return {
    type: 'LOG_IN',
    user
    
};
}


export function logout(){
  return {
    type: 'LOG_OUT',
    
};
}

export function addProduct(product){
  return {
    type: 'ADD_PRODUCT',
    product
    
};
}

export function postProduct(product){
  return (dispatch)=>{

    var promise1 = postAProduct ( product );
    promise1.then((response)=>{

      dispatch(addProduct(product));

    })


};
}


export function postLogin(user){
    
  return (dispatch)=>{

    var promise1 = postlogin ( user.email, user.password );
    promise1.then((response)=>{
      response.id = response._id;
      dispatch(login(response));

    }).catch((err) => {
      alert ("Login Failed. Please Try Again");
    })


};
}

export function postLogout(){
    
    return (dispatch)=>{
  
      var promise1 = postAndLogout();
      promise1.then((response)=>{
        dispatch(logout());
  
      })
  
  
  };
  }


export function postSignup(user){
console.log("action",user)
  
  return (dispatch)=>{

    var promise1 = postNewUser ( user );
    promise1.then((response)=>{

      dispatch(signup(response));

    })


};
}

export function postPostComment(comment) {

  
  return (dispatch)=>{

    var promise1 = postAPostComment ( comment );
    promise1.then((response)=>{
      response.id = response._id;
      dispatch(addPostComment(response));

    })


};
}


export function postProductComment(comment) {


  
  return (dispatch)=>{

    var promise1 = postAProductComment ( comment );
    promise1.then((response)=>{
      response.id = response._id;
      dispatch(addProductComment(response));

    })


};
}


export const receiveProducts = products=>({
  type:'RECEIVE_PRODUCTS',
  products
})
export const receiveProductComments = comments=>({
  type:'RECEIVE_PRODUCT_COMMENTS',
  comments
})


export const fetchProductComments =() =>{
  return (dispatch)=>{
    var promise1 = getProductComments();
    promise1.then((response)=>{
      response.map ( p => {
        p.id = p._id;
        return p;
      });
      console.log ( response );
      return response;

    })
    .then((res)=>{
      dispatch(receiveProductComments(res))
    })
  };
}


export const fetchproducts =() =>{
  return (dispatch)=>{

    dispatch(itemsIsLoading(true));
    var promise1 = getProducts();
    promise1.then((response)=>{
      response.map ( p => {
        p.id = p._id;
        return p;
      });
      dispatch(itemsIsLoading(false));
      console.log ( response );
      return response;

    })
    .then((res)=>{
      dispatch(receiveProducts(res))
    })

};
}

export const fetchPostComments =() =>{
  return (dispatch)=>{
    var promise1 = getForumComments();
    promise1.then((response)=>{
      response.map ( p => {
        p.id = p._id;
        return p;
      });
      console.log ( response );
      return response;

    })
    .then((res)=>{
      dispatch(receivePostComments(res))
    })
  };
}

export const fetchPosts =() =>{
    
    return (dispatch)=>{

      var promise1 = getForumPosts();
      promise1.then((response)=>{
        response.map ( p => {
          p.id = p._id;
          return p;
        });
        console.log ( response );
        return response;

      })
      .then((res)=>{
        dispatch(receivePosts(res))
      })
 };
 }



export const updatePost = (id,category,title,author,body,timestamp) => ({
  type:'UPDATE_POST',
  id,
  category,
  title,
  author,
  body,
  voteScore:0,
  timestamp

})

export const updateComment = (id,parentId,author,body,timestamp) => ({
  type:'UPDATE_COMMENT',
  id,
  parentId,
  author,
  body,
  voteScore:0,
  timestamp
})


export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})
export const sortBy = filter => ({
  type: 'SORT_BY',
  filter
})
export const addComment = (parentId,author,body,timestamp) => ({
  type: 'ADD_COMMENT',
  id:nextCommentId++,
  parentId,
  author,
  body,
  timestamp
})


export const setPostVisible = id => ({
  type: 'SET_POST_VISIBLE',
  id
})

export const onClickUp = id => ({
  type: 'ON_CLICK_UP',
  id
})
/*
export const upVotePost =(id) => dispatch =>{
  return api.changeScore(id,UP).then(post => dispatch(onClickUp(post.id)))
}
*/

export const deletePost = id => ({
  type: 'DELETE_POST',
  id
})

export const deleteComment = id => ({
  type: 'DELETE_COMMENT',
  id
})
export const onClickDown = id => ({
  type: 'ON_CLICK_DOWN',
  id
})
/*
export const downVotePost =(id) => dispatch =>{
  return api.changeScore(id,DOWN).then(post => dispatch(onClickDown(post.id)))
}*/

export const onClickUpComment = id => ({
  type: 'ON_CLICK_UP_C',
  id
})
export const onClickDownComment = id => ({
  type: 'ON_CLICK_DOWN_C',
  id
})
export const VisibilityFilters = {
  ALL: 'ALL',
  REACT: 'REACT',
  REDUX: 'REDUX',
  UDACITY: 'UDACITY'
}
