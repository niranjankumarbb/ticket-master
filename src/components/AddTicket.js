import React from 'react'
import {connect} from 'react-redux'
import { render } from 'react-dom'
import {startPostTicket} from '../actions/ticketAction'

class AddTicket extends React.Component{
    constructor(){
        super()
        this.state= {
            code     : '',
            customer : '',
          department : '',
          employees  : '',
          message    : '',
          priority   : ''
         }
    }

    handleChange = (e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = (e)=>{
        e.preventDefault()
         const customerId = this.props.customers.find(customer=> customer.name == this.state.customer)._id
         const departmentId = this.props.departments.find(department=> department.name == this.state.department)._id
         const employeesId = this.props.employees.find(employee=> employee.name == this.state.employees)._id
          const employeesData= {
                _id : employeesId
         }
         const employeesArray = [].concat(employeesData)
 
         const formData = {
              code : this.state.code,
         customer  : customerId,
         department: departmentId,
         employees : employeesArray,
         priority  : this.state.priority,
         message   : this.state.message
         }
 
        const redirect=()=>{
            this.props.history.push('/tickets')
        }
         this.props.dispatch(startPostTicket(formData, redirect))
    }
  
    render() {
        console.log('AddTicket state values', this.state)
        return (
            <div>
                { (this.props.customers && this.props.departments && this.props.employees) ? (
                   <div>
                    <h1> Add Ticket </h1>
                   <form onSubmit = {this.handleSubmit}>

                   <div className="form-group">
                   <label>Code</label> <br/>
                      <input type='text' name='code' value= {this.state.code} onChange= {this.handleChange} className="form-control"/>
                        <br/> <br/> <br/>
                   </div>

                   <div className="form-group">
                   <label>Customer</label> <br/>
                      <select name='customer' value= {this.state.customer} onChange= {this.handleChange} className="form-control">
                       <option value=''>--Select--</option>
                        {this.props.customers.map((customer,i)=>{
                         return (
                          <option key={i} value={customer.name} >{customer.name}</option>
                             )
                        })}
                     </select>   
                    <br/> <br/> <br/>
                   </div>

                   <div className="form-group">
                   <label>Department</label> <br/>
                    <select name='department' value= {this.state.department} onChange= {this.handleChange} className="form-control">
                    <option value=''>--Select--</option>
                    {this.props.departments.map((department,i)=>{
                    return (
                     <option key={i} value={department.name} >{department.name}</option>
                      )
                   })}
                   </select>   
                   <br/> <br/> <br/>
                   </div>

                   <div className="form-group">
                   <label>Employees</label> <br/>
                   <select name='employees' value= {this.state.employees} onChange= {this.handleChange} className="form-control">
                   <option value=''>--Select--</option>
                   {this.props.employees.filter(em=>em.department.name==this.state.department).map((employee,i)=>{
                   return (
                   <option key={i} value={employee.name} >{employee.name}</option>
                   )
                  })}
                    </select>   
                   <br/> <br/> <br/>
                   </div>

                   <div className="form-group">
                   <label>Message</label> <br/>
                     <textarea name='message' value= {this.state.message} onChange= {this.handleChange} className="form-control"/>
                   </div>

                   <h3>Priority</h3>

                   <div className="form-group">
               
                  <input type='radio' name='priority'  value='High' onChange={this.handleChange} className="form-control" />
                  <label>High</label>   <br/>

                  <input type='radio' name='priority'  value='Medium' onChange={this.handleChange} className="form-control" />
                   <label>Medium</label> <br/>

                  <input type='radio' name='priority'  value='Low' onChange={this.handleChange}  className="form-control"/>
                  <label>Low</label>
                   <br/> <br/> <br/>
                   </div>

                   <div className="form-group">
                   <input type='Submit' value='Submit' className="form-control"/>
                   </div>     
            </form>
          </div>  
         ) : (
             <h1> Loading</h1>
         )  
       }
      </div>
     )
  }
}

const mapStateToProps = (state)=>{
    return { 
        customers : state.customers,
      departments : state.departments,
      employees   : state.employees

        }
    
}
export default connect(mapStateToProps)(AddTicket)