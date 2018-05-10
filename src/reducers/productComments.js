const productComments = (state = [], action) => {
    switch (action.type) {
      case 'RECEIVE_PRODUCT_COMMENTS':
        return action.comments

      case 'ADD_PRODUCT_COMMENT':

        return [
          ...state,
          
            action.comment
        ]


      default:
        return state
  
    }
  }
  
  export default productComments
  