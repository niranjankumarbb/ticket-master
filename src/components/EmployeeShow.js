import React from 'react'
import {Link} from 'react-router-dom'
import{connect} from 'react-redux'

class EmployeeShow extends React.Component{
    constructor (){
        super()
        this.state= {
            all : false,
            pending : false,
            completed: false
        }
    }

    handleAll = ()=>{
        this.setState({
            all   : true,
          pending : false,
          completed : false
      })
    }

    handlePending = ()=>{
        this.setState({
              all   : false,
            pending : true,
            completed : false
        })
    }    

    handleCompleted = ()=>{
        this.setState({
            all     : false,
            pending : false,
            completed : true
        })
    }

    render(){
       console.log(this.state)
        return(
            <div>
                { (this.props.customers.length>0 && this.props.empTickets.length>=0 && this.props.empTicketsPending.length>=0 && this.props.empTicketsCompleted.length>=0&& this.props.employee && this.props.departments.length>0) ? (
                    <div>
                       <h1>{this.props.employee.name} - {this.props.employee.email} </h1>
                       < Link  to = {`/employees/edit/${localStorage.getItem('empId')}`} > Edit </Link>
                       <br/> <br/>
                       <button onClick={this.handleAll} className="btn btn-primary">All</button> |
                       <button onClick={this.handlePending} className="btn btn-primary">Pending</button> |
                       <button onClick={this.handleCompleted} className="btn btn-primary">Completed</button> 
                       <br/> <br/><br/>                
 
                       <table border='1'>
                        <tbody>
                             { this.state.pending?(
                                 <React.Fragment>
                                   <h1> Tickets - {this.props.empTicketsPending.length} </h1>
                                   <br/> <br/>
                                   { this.props.empTicketsPending.map(empTicket=>{
                                    return(
                                       <React.Fragment>
                                        <tr><td> Customer - {this.props.customers.find(cust=>cust._id==empTicket.customer).name}</td></tr>
                                        <tr><td> Employees - {this.props.employee.name}</td></tr>
                                        <tr><td> Department - {this.props.departments.find(depart=>depart._id== empTicket.department).name}</td></tr>
                                        <tr><td> Message -   {empTicket.message}</td></tr>
                                        <tr><td> Priority -  {empTicket.priority}</td></tr>
                                        <hr/>
                                        <br/> <br/> <br/>
                                        </React.Fragment>
                                        )                                                      
                                     })
                                   }
                                </React.Fragment>
                             ): ('')
                          }
                             {
                                 this.state.all && (
                                     <React.Fragment>
                                         <h1> Tickets - {this.props.empTickets.length} </h1>
                                           <br/> <br/>
                                          {this.props.empTickets.map(empTicket=>{
                                           return(
                                           <div>
                                            <tr><td> Customer - {this.props.customers.find(cust=>cust._id==empTicket.customer).name}</td></tr>
                                            <tr><td> Employees - {this.props.employee.name}</td></tr>
                                            <tr><td> Department - {this.props.departments.find(depart=>depart._id== empTicket.department).name}</td></tr>
                                            <tr><td> Message -   {empTicket.message}</td></tr>
                                            <tr><td> Priority -  {empTicket.priority}</td></tr>
                                            <hr/>
                                            <br/> <br/> <br/>
                                            </div>
                                            )
                                                          
                                          })
                                        }
                                     </React.Fragment>
                                 )
                             }
                             {
                                 this.state.completed && (
                                     <React.Fragment>
                                         <h1> Tickets - {this.props.empTicketsCompleted.length} </h1>
                                          <br/> <br/>
                                          {this.props.empTicketsCompleted.map(empTicket=>{
                                        return(
                                           <React.Fragment>
                                            <tr><td> Customer - {this.props.customers.find(cust=>cust._id==empTicket.customer).name}</td></tr>
                                            <tr><td> Employees - {this.props.employee.name}</td></tr>
                                            <tr><td> Department - {this.props.departments.find(depart=>depart._id== empTicket.department).name}</td></tr>
                                            <tr><td> Message -   {empTicket.message}</td></tr>
                                            <tr><td> Priority -  {empTicket.priority}</td></tr>
                                            <hr/>
                                            <br/> <br/> <br/>
                                            </React.Fragment>
                                            )                                                          
                                          })
                                        }
                                     </React.Fragment>
                                 )
                             }    
                  </tbody>                        
               </table>
             </div>
             ) : (
             <h1> Loading...</h1>
             )
             }
             </div>            
        )
    }
}

const mapStateToProps= (state)=>{ 
  return {
  customers : state.customers ,
  empTickets : state.tickets.filter(ticket=> ticket.employees[0]._id == localStorage.getItem('empId1')  ),
  empTicketsPending : state.tickets.filter(ticket=> ticket.employees[0]._id == localStorage.getItem('empId1') ).filter(tic=>tic.isResolved==false),
  empTicketsCompleted : state.tickets.filter(ticket=> ticket.employees[0]._id == localStorage.getItem('empId1')).filter(tic=>tic.isResolved==true),
  employee : state.employees.find(emp=> emp._id == localStorage.getItem('empId1') ),
   departments : state.departments
    }
}
export default connect(mapStateToProps)(EmployeeShow)