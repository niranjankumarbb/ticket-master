import React from 'react'
import AddEmployee from './AddEmployee'
import{Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { startGetEmployees, startRemoveEmployee } from '../actions/employeesAction'

class Employees extends React.Component{

    componentDidMount(){
      this.props.dispatch(startGetEmployees())
    }

    handleRemove = (id)=>{
        const confirmed= window.confirm('Are you sure you want to remove ?')
        if(confirmed){
            this.props.dispatch(startRemoveEmployee(id))
        }
    }

    handleShow= (id)=>{
        localStorage.setItem('empId1', id)
        this.props.history.push(`/employees/${localStorage.getItem('empId1')}`)        
    }

    render(){
        return(
              <React.Fragment>
                  { this.props.employees ? (
                  <div>
                  <h1> Employees -{this.props.employees.length} </h1>
                  <table border='1'>
                      <thead>
                          <tr>
                              <th>Id</th>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Mobile</th>
                              <th>Department</th>
                              <th>Actions</th>
                              <th>Remove</th>  
                          </tr>
                      </thead>
                      <tbody>
                           {
                              this.props.employees.map((employee,i)=>{
                                  return (
                                      <tr key={i}>
                                         <td>{employee._id}</td>
                                         <td>{employee.name}</td>
                                         <td>{employee.email}</td>
                                         <td>{employee.mobile}</td>
                                         <td>{employee.department.name}</td>
                                         <td>
                                             <button onClick={()=>{
                                             this.handleShow(employee._id)}}  className="btn btn-primary">Show</button>
                                         </td>
                                         <td>
                                         <button onClick={()=>{
                                             this.handleRemove(employee._id)}}  class="btn btn-danger">remove</button>
                                         </td>
                                      </tr>
                                  )
                              })
                          }
                      </tbody>
                  </table>
                  <Link  to = '/employees/new'> Add Employee</Link>
                  </div>
                  ) : (
                      <h1> Loading...</h1>
                  )
                }
              </React.Fragment>
          )
    }
}
const mapStateToProps =(state)=>{
    return {
        employees : state.employees 
    }
}
export default connect(mapStateToProps)(Employees)