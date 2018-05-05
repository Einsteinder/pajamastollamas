//import * as api from '../utils/api'



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

    var promise1 = new Promise(function(resolve, reject) {
      setTimeout(resolve, 1000, "post post successfully");
    });
    promise1.then((response)=>{

      dispatch(addPost(post));

    })


};
}



export function postPostComment(comment) {

  
  return (dispatch)=>{

    var promise1 = new Promise(function(resolve, reject) {
      setTimeout(resolve, 1000, "post comment successfully");
    });
    promise1.then((response)=>{

      dispatch(addPostComment(comment));

    })


};
}


export function postProductComment(comment) {


  
  return (dispatch)=>{

    var promise1 = new Promise(function(resolve, reject) {
      setTimeout(resolve, 1000, "post comment successfully");
    });
    promise1.then((response)=>{

      dispatch(addProductComment(comment));

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
  let comments=[{
    id:"r1",
    userId:"u1",
    author:"Super Man",
    productId:"p1",
    content:"Love these pjs. Warm, comfortable and wonderful for lounging or sleeping. Highly recommend.",
    timestamp:"February 8, 2018",
    rate:4
},
{
    id:"r2",
    userId:"u2",
    author:"Spider Man",
    productId:"p2",
    content:"Bought these as a gift for my mother-in-law. She loved them. Says they're soft & comfy & keep her warm. She is always cold at night but not anymore. I have purchased several items and am pleased with them all.",
    timestamp:"January 13, 2018",
    rate:5
}
]

  return (dispatch)=>{
      setTimeout(()=>{
    dispatch(receiveProductComments(comments))
},1000)
};
}


export const fetchProducts =() =>{
  let products=[{
    imgURL:"https://d39rqydp4iuyht.cloudfront.net/store/product/165250/1000x1000/51810_MN.jpg",
    name:"Loving Paws",
    price:10,
    id:"p1",
},
{
    imgURL:"https://d39rqydp4iuyht.cloudfront.net/store/product/191733/1000x1000/58818_Crop1.jpg",
    name:"All Over Paws Plush Lounge Pants",
    price:11,
    id:"p2",
},
{
    imgURL:"https://d39rqydp4iuyht.cloudfront.net/store/product/190414/1000x1000/83200_MN.jpg",
    name:"Super Cozy™ Sherbet Pets Slipper Booties",
    price:12,
    id:"p3",
},
{
    imgURL:"https://d39rqydp4iuyht.cloudfront.net/store/product/194651/1000x1000/26498_LAB.jpg",
    name:"Purple Paw Women's Casual Shorts",
    price:15,
    id:"p4",

},
{
    imgURL:"https://d39rqydp4iuyht.cloudfront.net/store/product/190623/1000x1000/85382_MN.jpg",
    name:"Rainbow Paws Thermal Long Sleeve Top",
    price:5,
    id:"p5",

}]

  return (dispatch)=>{

    dispatch(itemsIsLoading(true));
    var promise1 = new Promise(function(resolve, reject) {
      setTimeout(resolve, 1000, products);
    });
    promise1.then((response)=>{
      dispatch(itemsIsLoading(false));
      return response;

    })
    .then((res)=>{
      dispatch(receiveProducts(res))
    })

};
}

/*
export const fetchPosts =() => dispatch =>{
  return api.fetchPosts().then(posts => dispatch(receivePosts(posts)))
}
*/


export const fetchPostComments =() =>{
  let comments=[{
    id: '894tuq4ut84ut8v4t8wun89g',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: '4/5/2018 @ 10:39:34',
    content: 'Hi there! I am a COMMENT.',
    userId: 'u1',
    author:'Sam James',
    voteScore: 6,
    deleted: false,
    parentDeleted: false
  },
  {
    id: '8tu4bsun805n8un48ve89',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: '4/5/2018 @ 10:39:34',
    content: 'Comments. Are. Cool.',
    userId: 'u2',
    author:'Amy Sparrow',
    voteScore: -5,
    deleted: false,
    parentDeleted: false
  }]

  return (dispatch)=>{
      setTimeout(()=>{
    dispatch(receivePostComments(comments))
},1000)
};
}

export const fetchPosts =() =>{
    let posts=[
       {
          id: '8xf0y6ziyjabvozdd253nd',
          userId:'12341256213476',
          author:'Zihan Zhang',
          timestamp: '4/5/2018 @ 10:39:10',
          title: 'Awesome Pajamas',
          content: "SO comfortable and SO cute! I love the design and thin, breathable material of these PJs. I’m 5’9, about 165 pounds, and am about two years out of playing college athletics. The reason I mention this is because I always have trouble finding pants that fit my aesthetic hamstrings/quads while still be snug at the hips. I got these PJs in medium and they fit PERFECTLY! The only downside is that they recommend washing these by hand which is a nuisance. I see other reviewers have machine washed them and they’ve been fine though but I don’t want them to shrink or lose their softness or get damaged in any way so I’ll continue to hand wash them.BOTTOM LINE: highly recommended for their softness and breathability! Especially recommended to athletic build woman as it’s snug in all the right places 😊SO comfortable and SO cute! I love the design and thin, breathable material of these PJs. I’m 5’9, about 165 pounds, and am about two years out of playing college athletics. The reason I mention this is because I always have trouble finding pants that fit my aesthetic hamstrings/quads while still be snug at the hips. I got these PJs in medium and they fit PERFECTLY! The only downside is that they recommend washing these by hand which is a nuisance. I see other reviewers have machine washed them and they’ve been fine though but I don’t want them to shrink or lose their softness or get damaged in any way so I’ll continue to hand wash them.BOTTOM LINE: highly recommended for their softness and breathability! Especially recommended to athletic build woman as it’s snug in all the right places 😊",
          voteScore: 6,
          deleted: false,
          commentCount: 0

        },
        {
          id: '6ni6ok3ym7mf1p33lnez',
          userId:'3546i3i365787l',
          author:'Paul Gruper',
          timestamp: '4/5/2018 @ 10:39:34',
          title: 'Llamas like it!',
          content: 'Just kidding. It takes more than 10 minutes to learn technology.',
          voteScore: -5,
          deleted: false,
          commentCount: 2

        }
    ]
    return (dispatch)=>{
        setTimeout(()=>{
      dispatch(receivePosts(posts))
  },1000)
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
