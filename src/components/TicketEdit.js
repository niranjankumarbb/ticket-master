import React from 'react'
import {connect} from 'react-redux'
import { render } from 'react-dom'
import {startPutTicket} from '../actions/ticketAction'

class TicketEdit extends React.Component{
    constructor(props){
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
         const formData = {
               priority :  this.state.priority
         }
         const id = localStorage.getItem('ticketId1')
         this.props.dispatch(startPutTicket(id,formData))
         this.props.history.push('/tickets') 
     }

    render() {
        console.log('TicketEdit state values', this.state)
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
                       <input type='radio' name='priority'  value='High' onChange={this.handleChange} />
                       <label>High</label>   <br/>

                        <input type='radio' name='priority'  value='Medium' onChange={this.handleChange} />
                        <label>Medium</label> <br/>

                       <input type='radio' name='priority'  value='Low' onChange={this.handleChange} />
                       <label>Low</label>
                       <br/> <br/> <br/>
                      </div>

                      <div className="form-group">
                      <input type='Submit' value='Submit'  className="form-control"/>
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
      employees   : state.employees,
      ticket      : state.tickets.find(tick=>tick._id == localStorage.getItem('authToken1'))
    }    
}
export default connect(mapStateToProps)(TicketEdit)