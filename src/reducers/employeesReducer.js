const employeesInitialValue = []
const employeesReducer = (state=employeesInitialValue, action)=>{
    switch(action.type) {

        case 'SET_EMPLOYEES' : {
            return  [...action.payload]
        }

        default : {
            return [].concat(state)
        }
    }
}
export default employeesReducer
