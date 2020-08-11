const departmentsInitialValue = []
const departmentsReducer = (state = departmentsInitialValue, action)=>{
      switch (action.type){       

         case 'SET_DEPARTMENTS' : {
             return   [].concat(action.payload)
         }

          default : {
              return [].concat(state)
          }
      }
}
export default departmentsReducer

