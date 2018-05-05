
const comments = (state = [], action) => {
    switch (action.type) {
      case 'RECEIVE_POST_COMMENTS':
        return action.comments

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


      default:
        return state
  
    }
  }
  
  export default comments
  