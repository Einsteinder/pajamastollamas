
export const products = (state = [], action) => {
    switch (action.type) {
      case 'RECEIVE_PRODUCTS':
        return action.products

        
      default:
        return state
  
    }
  }
  
  export function itemsIsLoading(state = false, action) {
    switch (action.type) {
        case 'ITEMS_IS_LOADING':
            return action.isLoading;
        default:
            return state;
    }
}


  