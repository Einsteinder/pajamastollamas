
const comments = (state = [], action) => {
    switch (action.type) {
      case 'ADD_COMMENT':

  
        return [
          ...state,
          {
            id: action.id,
            parentId:action.parentId,
            body: action.body,
            author:action.author,
            timestamp:action.timestamp,
            voteScore:0,
            deleted: false,
            parentDeleted:false
          }
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
  