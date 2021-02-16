import React from 'react'
import {connect} from 'react-redux'
import addCustomer from '../actions/customerAction'
import { Redirect} from 'react-router-dom'
import {startPutCustomer} from '../actions/customerAction'

class CustomerEdit extends React.Component{
    constructor (props){
        super()
        this.state= {
            name : props.customer.name,
            email : props.customer.email,
            mobile : props.customer.mobile     
        }
    }

    handleChange= (e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = (e)=>{
        console.log('CustomerEdit handlesubmit entered')
        e.preventDefault()
        const customId= localStorage.getItem('customId1')
        const formData ={
            name     : this.state.name,
             email   : this.state.email,
             mobile  : this.state.mobile
         }
         const redirect = ()=>{
            console.log('redirect function entered')
            return  this.props.history.push('/customers')         
         }
        this.props.dispatch(startPutCustomer(customId,formData, redirect))
     }

    render(){
        console.log('CustomerEdit page props ',this.props)
         return(
            <div>
                <h1> Edit Customer </h1> 

                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                    <label> Name </label> 
                    <br/> 
                    <input type='text' name='name'  value={this.state.name} onChange={this.handleChange} className="form-control"/>
                    <br/> <br/> <br/>
                    </div>

                    <div className="form-group">
                    <label> Email </label> 
                    <br/> 
                    <input type='text' name='email'  value={this.state.email} onChange={this.handleChange} className="form-control"/>
                    <br/> <br/> <br/>
                    </div>

                    <div className="form-group">      
                    <label> Mobile </label> 
                    <br/> 
                    <input type='number' name='mobile'  value={this.state.mobile} onChange={this.handleChange} className="form-control"/>
                    <br/> <br/> <br/>
                    </div>

                    <div className="form-group">
                    <input type='submit' value='Submit' className="form-control"/>
                    </div>           
                </form>
             </div>
        )
    }
}

const mapStateToProps= (state,props)=>{
     return {
        customer : state.customers.find(custom=>custom._id == localStorage.getItem('customId1') 
        )
    }
}

export default connect(mapStateToProps)(CustomerEdit)