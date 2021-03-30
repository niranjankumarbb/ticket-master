import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class CustomerShow extends React.Component{
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
        console.log('customerShow page props',this.props)
        return (
            <div>
                { (this.props.customer && this.props.customTickets.length>=0 && this.props.customTicketsPending && this.props.customTicketsCompleted  && this.props.employees.length>=0 && this.props.departments.length>=0) ? (
                    <div>
                       <h1>  { this.props.customer.name} - {this.props.customer.email}</h1>
                       <Link to ={ `/customers/edit/${localStorage.getItem('customId1')}`}>Edit</Link>
                        <br/> <br/>   
                       <button onClick={this.handleAll} className="btn btn-primary">All</button> |
                       <button onClick={this.handlePending} className="btn btn-primary">Pending</button> |
                       <button onClick={this.handleCompleted} className="btn btn-primary">Completed</button> 
                       <br/> <br/><br/>                     
                         
                        <table border='1'>
                        <tbody>
                        { this.state.pending?(
                           <React.Fragment>
                             <h1> Tickets - {this.props.customTicketsPending.length} </h1>
                                <br/> <br/>
                                {
                                this.props.customTicketsPending.map(customTicket=>{
                                    return (
                                        <div>
                                        <tr><td> Customer - {this.props.customer.name}</td></tr>
                                        <tr><td> Employees - {this.props.employees.find(emp=>emp._id== customTicket.employees[0]._id).name} </td></tr>
                                        <tr><td> Department - {this.props.departments.find(depart=>depart._id== customTicket.department).name}</td></tr>
                                        <tr><td> Message -   {customTicket.message}</td></tr>
                                        <tr><td> Priority -  {customTicket.priority}</td></tr>
                                        </div>
                                     )
                                })
                               }
                           </React.Fragment>
                             ): ('')
                          }
                         
                          {
                                 this.state.completed && (
                                     <React.Fragment>
                                        <h1> Tickets - {this.props.customTicketsCompleted.length} </h1>
                                        <br/> <br/>
                                        {
                                        this.props.customTicketsCompleted.map(customTicket=>{
                                        return (
                                        <div>
                                        <tr><td> Customer - {this.props.customer.name}</td></tr>
                                        <tr><td> Employees - {this.props.employees.find(emp=>emp._id== customTicket.employees[0]._id).name} </td></tr>
                                        <tr><td> Department - {this.props.departments.find(depart=>depart._id== customTicket.department).name}</td></tr>
                                        <tr><td> Message -   {customTicket.message}</td></tr>
                                        <tr><td> Priority -  {customTicket.priority}</td></tr>
                                        </div>
                                     )
                                })
                            }
                                    </React.Fragment>
                                 )
                            }  
                             
                            {
                                 this.state.all && (
                                     <>
                                        <h1> Tickets - {this.props.customTickets.length} </h1>
                                        <br/> <br/>
                                        {
                                        this.props.customTickets.map(customTicket=>{
                                        return (
                                        <div>
                                        <tr><td> Customer - {this.props.customer.name}</td></tr>
                                        <tr><td> Employees - {this.props.employees.find(emp=>emp._id== customTicket.employees[0]._id).name} </td></tr>
                                        <tr><td> Department - {this.props.departments.find(depart=>depart._id== customTicket.department).name}</td></tr>
                                        <tr><td> Message -   {customTicket.message}</td></tr>
                                        <tr><td> Priority -  {customTicket.priority}</td></tr>
                                        </div>
                                     )
                                })
                            }
                             </>
                               )
                            }                 
                        </tbody>                        
                    </table>
                  </div> 
                ) : (
                    <h2> loading...</h2>
                )
                }   
            </div>
        )
    }
}

const mapStateToProps= (state)=>{
  return {
  customer : state.customers.find(custom=> custom._id == localStorage.getItem('customId1') ),
  customTickets : state.tickets.filter(ticket=> ticket.customer == localStorage.getItem('customId1')),
  customTicketsPending : state.tickets.filter(ticket=> ticket.customer == localStorage.getItem('customId1')).filter(tic=>tic.isResolved==false),
  customTicketsCompleted : state.tickets.filter(ticket=> ticket.customer == localStorage.getItem('customId1')).filter(tic=>tic.isResolved==true),
  employees : state.employees,
  departments : state.departments
    }
}
export default connect(mapStateToProps)(CustomerShow)


