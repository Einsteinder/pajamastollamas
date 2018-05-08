
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
            const currentUser = state.users.filter(user=>user.email===action.user.email)[0]
            if(currentUser){
                return {users:state.users,
                    currentUser:{email:currentUser.email,admin:currentUser.admin}}
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
