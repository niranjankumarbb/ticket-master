import React from 'react'
import {connect} from 'react-redux'
import addCustomer from '../actions/customerAction'
import { Redirect} from 'react-router-dom'
import {startPostCustomer} from '../actions/customerAction'

class AddCustomer extends React.Component{
    constructor (){
        super()
        this.state= {
            name : '',
            email : '',
            mobile : undefined
         }
    }

    handleChange= (e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = (e)=>{
         e.preventDefault()        
        const formData ={
            name    : this.state.name,
            email   : this.state.email,
            mobile  : this.state.mobile
        }
         const redirect = ()=>{
             return  this.props.history.push('/customers')
        }
        this.props.dispatch(startPostCustomer(formData, redirect))
     }

    render(){
          return(
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <h1> Add Customer </h1> 
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
                    <input type='submit' value='Submit'  className="form-control"/>
                    </div>           
                 </form>
                </div>
             </div>
        )
    }
}

const mapStateToProps= (state)=>{
     return {
        customers : state.customers

    }
}
export default connect(mapStateToProps)(AddCustomer)