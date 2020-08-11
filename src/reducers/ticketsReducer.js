const ticketInitialValue = []
const ticketsReducer = (state=ticketInitialValue, action)=>{
     switch(action.type){

       case 'SET_TOKENS' : {
           return [...action.payload]
       }

       default : {
           return [...state]
       }
     }
}
export default ticketsReducer

