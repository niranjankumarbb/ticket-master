import React from 'react'
import {BrowserRouter , Link, Route, Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import CustomersList from './components/CustomersList'
import CustomerShow from './components/CustomerShow'
import AddCustomer from './components/AddCustomer'
import CustomerEdit from './components/CustomerEdit'
import Departments from './components/Departments'
import DepartmentEdit from './components/DepartmentEdit'
import Employees from './components/Employees' 
import EmployeeEdit from './components/EmployeeEdit'
import AddEmployee from './components/AddEmployee'
import EmployeeShow from './components/EmployeeShow'
import Tickets from './components/Tickets'
import TicketShow from './components/TicketShow' 
import TicketEdit from './components/TicketEdit'
import AddTicket from './components/AddTicket'
 import DepartmentShow from './components/DepartmentShow'
import {connect} from 'react-redux'
import {startLogout} from './actions/logoutAction'

function App (props){
 
  const  handleClick = ()=>{
        props.dispatch(startLogout())

  }
     return(
        <BrowserRouter>
            <div className="container">
              { localStorage.getItem('authToken1')? (
             <div>
                <Link to ='/' className="btn btn-link"> Home</Link> |
                <Link to ='/customers' className="btn btn-link"> Customers</Link> |
                <Link to ='/departments' className="btn btn-link"> Departments</Link> |
                <Link to ='/employees' className="btn btn-link"> Employees</Link> |
                <Link to ='/tickets' className="btn btn-link"> Tickets</Link> |
                <Link to ='#' onClick = {handleClick} className="btn btn-link"> Logout</Link> 

               <Switch>
                <Route path='/' component={Home} exact={true}/>
                <Route path='/customers' component={CustomersList} exact={true}/>
                <Route path='/customers/new' component={AddCustomer}  /> 
                <Route path='/departments' component={Departments} exact={true}/>
                <Route path='/employees' component={Employees} exact={true}/>
                <Route path='/employees/new' component={AddEmployee} />
                <Route path='/tickets' component={Tickets} exact={true} />
                <Route path='/tickets/new' component={AddTicket}  />
                <Route path='/tickets/edit/:id' component={TicketEdit}  />
                <Route path='/customers/edit/:id' component={CustomerEdit}  /> 
                <Route path='/departments/edit/:id' component={DepartmentEdit}  /> 
                <Route path='/employees/edit/:id' component={EmployeeEdit}  /> 
                <Route path='/customers/:id' component={CustomerShow}  />
                <Route path='/departments/:id' component={DepartmentShow} />     
                <Route path='/employees/:id' component={EmployeeShow} />   
                <Route path='/tickets/:id' component={TicketShow}  />           
               </Switch>
             </div>
              )  : (
            <div>
                <Link to ='/'> Home</Link> |
                <Link to ='/login'> Login</Link> |
                <Link to ='/register'> Register</Link>

                <Route path='/' component={Home} exact={true}/>
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register}  />
             </div>
              )}             
            </div>        
        </BrowserRouter>
    )
}

const mapStateToProps= (state)=>{
    return {
        loginStatus : state.loginStatus,
        user        : state.user
    }
}
export default connect(mapStateToProps)(App)
