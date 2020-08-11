import React from 'react'
 import ReactDOM from 'react-dom'
import App from './App'
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'
import {startGetCustomer} from './actions/customerAction'
import {startGetUser} from './actions/userAction'
import {startGetDepartments} from './actions/departmentsAction'
import {startGetEmployees} from './actions/employeesAction'
import {startGetTickets} from './actions/ticketAction'

const store = configureStore()
 
if(localStorage.getItem('authToken1')){
     store.dispatch(startGetUser())
}
  
store.dispatch(startGetCustomer( ))
store.dispatch(startGetDepartments( ))
store.dispatch(startGetEmployees())
store.dispatch(startGetTickets())
 
store.subscribe(()=>{
    console.log('store value',store.getState())
})

const ele = (
 <Provider store={store}>
    <App/>
</Provider> 
)

ReactDOM.render(ele, document.getElementById('root'))