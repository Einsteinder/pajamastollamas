
export const users = (state = {}, action) => {
    switch (action.type) {
      case 'SIGN_UP':
        return {users:[
            ...state,
            {email:action.user.email,
                password:action.user.password,
                confirm:action.user.confirm,
                nickname:action.user.nickname,
                admin:false
            }
        ],
        currentUser:{}
    }
        case 'LOG_IN':
            const currentUser = action.user;
            if(currentUser){
                return {users:state.users,
                    currentUser:currentUser}
            }else{
                return {users:state.users,
                    currentUser:{}
                }
            }

        
        case 'LOG_OUT':
        return {users:state.users,
            currentUser:{}
    }

      default:
        return state
  
    }
  }
