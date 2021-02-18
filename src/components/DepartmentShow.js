import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class DepartmentShow extends React.Component{
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
        console.log('departmentShow page props',this.props)        
        return (
            <div>
                { (this.props.customers.length>=0 && this.props.departTickets && this.props.departTicketsPending && this.props.departTicketsCompleted && this.props.employees.length>=0 && this.props.department) ? (
                    <div>
                        <h1>  Name -{ this.props.department.name} </h1>
                        <Link to ={ `/departments/edit/${localStorage.getItem('departId1')}`}>Edit</Link>
                        <br/> <br/>
                        <button onClick={this.handleAll} className="btn btn-primary">All</button> |
                        <button onClick={this.handlePending} className="btn btn-primary">Pending</button> |
                        <button onClick={this.handleCompleted} className="btn btn-primary">Completed</button> 
                        <br/> <br/><br/>                      
                    <table border='1'>
                    <tbody>
                        { this.state.pending?(
                                 <React.Fragment>
                                     <h1> Tickets - {this.props.departTicketsPending.length} </h1>
                                      <br/> <br/>
                                      {
                                       this.props.departTicketsPending.map(departTicket=>{
                                       return (
                                        <div>
                                        <tr><td> Customer - {this.props.customers.find(cust=>cust._id==departTicket.customer).name}</td></tr>
                                        <tr><td> Employees - {this.props.employees.find(emp=>emp._id== departTicket.employees[0]._id).name}  </td></tr>
                                        <tr><td> Department - {this.props.department.name}</td></tr>
                                        <tr><td> Message -   {departTicket.message}</td></tr>
                                        <tr><td> Priority -  {departTicket.priority}</td></tr>
                                        <hr/>
                                        <br/> <br/> <br/>
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
                                         <h1> Tickets - {this.props.departTicketsCompleted.length} </h1>
                                          <br/> <br/>
                                          {
                                       this.props.departTicketsCompleted.map(departTicket=>{
                                        return (
                                        <div>
                                        <tr><td> Customer - {this.props.customers.find(cust=>cust._id==departTicket.customer).name}</td></tr>
                                        <tr><td> Employees - {this.props.employees.find(emp=>emp._id== departTicket.employees[0]._id).name} </td></tr>
                                        <tr><td> Department - {this.props.department.name}</td></tr>
                                        <tr><td> Message -   {departTicket.message}</td></tr>
                                        <tr><td> Priority -  {departTicket.priority}</td></tr>
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
                                 this.state.all && (
                                     <React.Fragment>
                                      <h1> Tickets - {this.props.departTickets.length} </h1>
                                      <br/> <br/>
                                      {
                                       this.props.departTickets.map(departTicket=>{
                                        return (
                                        <div>
                                        <tr><td> Customer - {this.props.customers.find(cust=>cust._id==departTicket.customer).name}</td></tr>
                                        <tr><td> Employees - {this.props.employees.find(emp=>emp._id== departTicket.employees[0]._id).name} </td></tr>
                                        <tr><td> Department - {this.props.department.name}</td></tr>
                                        <tr><td> Message -   {departTicket.message}</td></tr>
                                        <tr><td> Priority -  {departTicket.priority}</td></tr>
                                        <hr/>
                                        <br/> <br/> <br/>
                                        </div>
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
                    <h2> loading...</h2>
                 )
              }   
            </div>
        )
    }
}

const mapStateToProps= (state)=>{  
  return {
  customers : state.customers,
  departTickets : state.tickets.filter(ticket=> ticket.department == localStorage.getItem('departId1') ),
  departTicketsPending : state.tickets.filter(ticket=> ticket.department == localStorage.getItem('departId1')).filter(tic=>tic.isResolved==false),
  departTicketsCompleted : state.tickets.filter(ticket=> ticket.department == localStorage.getItem('departId1')).filter(tic=>tic.isResolved==true),
  employees : state.employees,
  department : state.departments.find(depart=> depart._id == localStorage.getItem('departId1'))
    }
}

export default connect(mapStateToProps)(DepartmentShow)


