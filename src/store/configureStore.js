import redux from 'redux'
import thunk from  'redux-thunk'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import userReducer from '../reducers/userReducer' 
import customersReducer from '../reducers/customersReducer' 
import departmentsReducer from '../reducers/departmentsReducer'
import employeesReducer from '../reducers/employeesReducer'
import ticketsReducer from '../reducers/ticketsReducer'  

const configureStore= ()=>{
    const store = createStore(combineReducers({
             user  : userReducer,
       customers   : customersReducer,
      departments  : departmentsReducer,
      employees    : employeesReducer,
      tickets      : ticketsReducer     
    }) , applyMiddleware(thunk))
   return store
}
export default configureStore
