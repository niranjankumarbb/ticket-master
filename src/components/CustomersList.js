import React from 'react'
import { connect } from "react-redux"
import {Link}  from 'react-router-dom'
import {startGetCustomer,startRemoveCustomer}  from '../actions/customerAction'

class CustomersList extends React.Component{

    componentDidMount(){
        this.props.dispatch(startGetCustomer())
    }

    handleShow = (id)=>{
        localStorage.setItem('customId1', id)  
        this.props.history.push(`/customers/${id}`)      
    }

    handleRemove = (id)=>{
        const confirmed=  window.confirm('Are you sure you want to remove')
         if(confirmed){
         this.props.dispatch(startRemoveCustomer(id)) 
        }
     }

    render(){
        console.log('customers data in CustomersList component',this.props.customers)
        return(
            <div>
            <h1> Customers - {this.props.customers.length} </h1>
            <table border ="1">
                <thead>
                    <tr>
                        <th> Id </th>
                        <th> Name </th>
                        <th> Email </th>
                        <th> Mobile </th>
                        <th> Actions </th>
                        <th> Remove </th>
                    </tr>
                </thead>
                <tbody>
                      {
                         this.props.customers.map((customer,i)=>{
                             return (
                                  <tr key={i}>
                                      <td> {customer._id} </td>
                                      <td> {customer.name} </td>
                                      <td> {customer.email} </td>
                                      <td> {customer.mobile}</td>
                                      <td> 
                                         <button onClick={()=>{
                                            this.handleShow(customer._id)
                                         }} className="btn btn-primary">Show</button> 
                                        </td>
                                      <td> 
                                        <button onClick={()=>{
                                            this.handleRemove(customer._id)}} class="btn btn-danger">Remove</button> 
                                         </td>
                                  </tr>
                             )
                         })
                    }
                </tbody>
            </table>
             <Link  to='/customers/new'> Add Customer</Link>          
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        customers : state.customers
    }
}
export default connect(mapStateToProps)(CustomersList)