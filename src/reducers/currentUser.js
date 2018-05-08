
export const currentUser = (state = {}, action) => {
    switch (action.type) {
      case 'LOG_OUT':
        return {}
        
      case 'LOG_IN':
        return action.user

      default:
        return state
  
    }
  }
