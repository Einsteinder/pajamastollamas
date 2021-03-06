


const comments = (state = [], action) => {
    switch (action.type) {
      case 'RECEIVE_POST_COMMENTS':
        return action.comments

      case 'ADD_POST_COMMENT':

        console.log ( action.comment );
  
        return [
          ...state,
          action.comment
        ]

      case 'UPDATE_COMMENT':

        return state.map(comment=>
          (comment.id===action.id)?{...comment,
            parentId:action.parentId,          
            body: action.body,
            author:action.author,
            timestamp:action.timestamp,
            voteScore:action.voteScore,
            deleted: false,
            parentDeleted:false
          }:comment)
  
      case 'DELETE_COMMENT':
        return state.map(comment=>
         (comment.id===action.id)?{...comment,deleted:true}:comment)

        
      case 'ON_CLICK_UP_C':
        return state.map(comment=>
          (comment.id===action.id)?{...comment,voteScore:comment.voteScore+1}:comment)
      case 'ON_CLICK_DOWN_C':
        return state.map(comment=>
          (comment.id===action.id)?{...comment,voteScore:comment.voteScore-1}:comment)
  
      default:
        return state
  
    }
  }
  
  export default comments
  