import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

function TicketShow(props){
    return (
         <div>
             { (props.ticket && props.customers.length>0 && props.employees.length>0 && props.departments.length>0)? (
                 <div>
                    <h1> Code Number - {props.ticket.code}</h1>
                    <table border='1'>
                        <tbody>
                             <tr><td> Customer - {props.customers.find(cust=>cust._id == props.ticket.customer).name}</td></tr>
                             <tr><td> Employees -  {props.employees.find(emp=>emp._id==props.ticket.employees[0]._id).name}</td></tr>
                             <tr><td> Department - {props.departments.find(depart=>depart._id == props.ticket.department).name}</td></tr>
                             <tr><td> Message -{props.ticket.message}</td></tr>
                             <tr><td> Priority -  {props.ticket.priority}</td></tr>                            
                        </tbody>                        
                    </table>
                    <Link to={`/tickets/edit/${localStorage.getItem('ticketId1')}`}> Edit</Link>
                   </div> 
               ): (
                 <h1> Loading...</h1>
             )
            }
         </div>
    )
}

const mapStateToProps= (state,props)=>{
    return {
    ticket : state.tickets.find(ticket=>ticket._id==localStorage.getItem('ticketId1')),
    customers  : state.customers,
    employees  : state.employees,
    departments : state.departments
    }
}

export default connect(mapStateToProps)(TicketShow)