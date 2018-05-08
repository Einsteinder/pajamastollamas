
export const users = (state = [], action) => {
    switch (action.type) {
      case 'SIGN_UP':
        return [
            ...state,
            {email:action.user.email,
                password:action.user.password,
                confirm:action.user.confirm,
                nickname:action.user.nickname,
                admin:false
            }
        ]

      default:
        return state
  
    }
  }
