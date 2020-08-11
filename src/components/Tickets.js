import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import AddTicket from './AddTicket'
import {startGetTickets,startRemoveTicket, startPutTicket} from '../actions/ticketAction'

class Tickets extends React.Component{

    constructor(){
        super()
        this.state= {
         pending      : false,
        completed    : false
        }
    } 

    componentDidMount(){
        this.props.dispatch(startGetTickets())         
    }

    handleRemove= (id)=>{
        const confirmed= window.confirm('Are you sure you want to remove?')
        if(confirmed){
            this.props.dispatch(startRemoveTicket(id))
        }
    }

    handleShow = (id)=>{
        localStorage.setItem('ticketId1', id)         
        this.props.history.push(`/tickets/${localStorage.getItem('ticketId1')}`)
    }

    handleCheck = (id)=>{
        const ticket = this.props.tickets.find(tick=>tick._id == id)          
          const data = {
            isResolved : !ticket.isResolved,           
        }
        this.props.dispatch(startPutTicket(id,data))
    }        

    handlePending = ()=>{
        this.setState({
            pending : true,
            completed : false
        })
    }    

    handleCompleted = ()=>{
        this.setState({
            pending : false,
            completed : true
        })
    }      
  
    render(){
        console.log(this.state)
        return(
            <div>
             {((this.props.customers.length>0) && (this.props.departments.length>0) && (this.props.employees.length>0) && (this.props.tickets.length>0) && (this.props.ticketsPending) && (this.props.ticketsCompleted))?(
                <div>                 
                <br/>  <br/>  <br/>  <br/>  
                <button onClick={this.handlePending} className="btn btn-primary">Pending</button> |
                <button onClick={this.handleCompleted} className="btn btn-primary">Completed</button> |
                <input type='text' value= {this.state.searchCode} onChange= {this.handleSearch} placeholder='search code'/>
                <br/> <br/> 

                <h2> Tickets - {this.props.tickets.length}</h2>
                <table border='1'>
                 <thead>
                     <tr>
                        <th> Code No</th>
                         <th>Customer</th>
                         <th>Department</th>
                         <th>Employees</th>
                         <th>Message</th>
                         <th>Priority</th>
                         <th>Actions</th>
                         <th>Remove</th>
                         <th>Complete</th>
                     </tr>
                 </thead>
                 <tbody>  
                 { this.state.pending? (
                      <React.Fragment>  
                       {this.props.tickets.filter(tick=>tick.isResolved == false).map(ticket=>{
                                  return(
                                    <tr key={ticket._id}>
                                    <td>{ticket.code}</td>
                                    <td>{this.props.customers.find(custom=>custom._id==ticket.customer).name}</td>
                                    <td>{this.props.departments.find(depart=>depart._id==ticket.department).name}</td>
                                     <td>{this.props.employees.find(emp=>emp._id== ticket.employees[0]._id).name} </td>
                                    <td>{ticket.message}</td>
                                    <td>{ticket.priority}</td>
                                    <td>
                                        <button onClick={()=>{
                                        this.handleShow(ticket._id)}} className="btn btn-primary"> show </button>
                                    </td>
                                    <td>
                                    <button onClick={()=>{
                                        this.handleRemove(ticket._id)}} class="btn btn-danger"> remove </button>
                                    </td>
                                    <td>
                                        <input type='checkbox' checked={ticket.isResolved}  onChange={()=>{
                                          this.handleCheck(ticket._id)}} />
                                    </td>
                                </tr>
                            )
                        })
                    }  
                    </React.Fragment>     
                    )   :                    
                    ( this.state.completed? (
                        <React.Fragment> 
                              {this.props.tickets.filter(tick=>tick.isResolved == true).map(ticket=>{
                                  return(
                                    <tr key={ticket._id}>
                                    <td>{ticket.code}</td>
                                    <td>{this.props.customers.find(custom=>custom._id==ticket.customer).name}</td>
                                    <td>{this.props.departments.find(depart=>depart._id==ticket.department).name}</td>
                                     <td>{this.props.employees.find(emp=>emp._id== ticket.employees[0]._id).name} </td>
                                    <td>{ticket.message}</td>
                                    <td>{ticket.priority}</td>
                                    <td>
                                        <button onClick={()=>{
                                            this.handleShow(ticket._id)}} className="btn btn-primary"> show </button>
                                          
                                    </td>
                                    <td>
                                    <button onClick={()=>{
                                            this.handleRemove(ticket._id)}} class="btn btn-danger"> remove </button>
                                    </td>
                                    <td>
                                        <input type='checkbox' checked={ticket.isResolved}  onChange={()=>{
                                            this.handleCheck(ticket._id)}} />
                                    </td>
                                </tr>
                            )
                        })
                    }  
                    </React.Fragment>
                      )  : (
                         <h2> Loading...</h2>
                       )) }
                 </tbody>     
                </table> 
               <Link to= '/tickets/new'>Add Ticket</Link> 
               <h4>Completed tickets : {parseInt((this.props.ticketsCompleted.length)/(this.props.tickets.length)*100)}%</h4>
               <progress id="" value={this.props.ticketsCompleted.length} max={this.props.tickets.length}>{this.props.ticketsCompleted.length}</progress>
               </div> 
                 ) : (
                     <h1>Loading...</h1>
                 )
              }  
             </div>
        )
    }
}

const mapStateToProps= (state)=>{
    return {
        customers : state.customers,
      departments : state.departments,
      employees  : state.employees,
       tickets    : state.tickets,
ticketsCompleted  : state.tickets.filter(tick=>tick.isResolved== true),
ticketsPending  : state.tickets.filter(tick=>tick.isResolved== false)

    }
}
export default connect(mapStateToProps)(Tickets)