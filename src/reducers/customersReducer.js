const customersInitialValue = []
const customersReducer = (state= customersInitialValue, action)=>{
      switch( action.type){

        case 'SET_CUSTOMERS' : {
            return [].concat(action.payload)
        }

          default : {
              return [...state]
          }
      }
}
export default customersReducer