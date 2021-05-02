import React from 'react'
import axios from 'axios'
import { connect} from 'react-redux'
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import { startRegisterUser} from '../actions/registerAction'
import Login from './Login'

class Register extends React.Component{
    constructor(){
        super()
        this.state = {
            username : '',
            email    : '',
            password : ''
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
             username : this.state.username,
             email    : this.state.email,
             password : this.state.password
         }
         const redirect = ()=>{
            this.props.history.push('/login')
        }
         this.props.dispatch(startRegisterUser(formData , redirect)) 
    }

    render(){
      return (
         <div>      
            <h1> Register</h1>
            <form  onSubmit={this.handleSubmit}>
                <input type = "text"  name ='username' value = {this.props.username} onChange={this.handleChange} placeholder='Username'/>
                <br/> <br/>
                <input type = "text"  name='email' value = {this.props.email} onChange={this.handleChange} placeholder='Email'/>
                <br/> <br/>
                <input type = "password"  name='password' value = {this.props.password} onChange={this.handleChange} placeholder='Password'/>
                <br/> <br/>
                <input type='submit' value = 'Register'/>
            </form>           
         </div> 
     )
  }
}

export default connect()(Register)