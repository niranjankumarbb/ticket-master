import React from 'react'
import { connect } from 'react-redux'
 import {startLoginUser} from '../actions/userAction'  

class Login extends React.Component{
      constructor(){
        super()
        this.state= {
          email   : '',
          password: ''
        }
      } 
  
    handleChange= (e)=>{
      this.setState({
        [e.target.name] : e.target.value
      })
    }     
    
    handleSubmit = (e)=>{
        e.preventDefault()
        const formData = {
          email    : this.state.email,
          password : this.state.password 
        } 
       this.props.dispatch(startLoginUser(formData))       
    } 

    render(){
    console.log(this.state)
      return (
         <div>            
            <h1> Login</h1>
            <form  onSubmit={this.handleSubmit}>
              <input type = "text"  name='email'  value = {this.props.email} onChange={this.handleChange} placeholder='Email'/>
              <br/> <br/>
              <input type = "password"  name='password'  value = {this.props.password} onChange={this.handleChange} placeholder='Password'/>
              <br/> <br/>
              <input type='submit' value = 'Login'/>
            </form>       
      </div>
     )
  }
}
export default connect()(Login)