import React from 'react'
import {connect} from 'react-redux'
import {startPutDepartment } from '../actions/departmentsAction'

class DepartmentEdit extends React.Component{
    constructor(props){
        super()
        this.state = {
            department : props.department.name
        }
    }

    handleChange = (e)=>{
        const department = e.target.value
        this.setState ({department})
    }

    handleSubmit = (e)=>{
        e.preventDefault()
        const formData = {
            name : this.state.department
        }
        const redirect = ()=>{
            console.log('redirect function entered')
            return  this.props.history.push('/departments')            
        }
        const id = localStorage.getItem('departId1') 
        this.props.dispatch(startPutDepartment(id,formData, redirect))
    }

 render(){
     return (
         <div>
             {
               this.props.department ?(
             <div>
             <h1> Edit Department</h1>
             <form onSubmit= {this.handleSubmit}>
                <div className="form-group">
                <input type= "text" value= {this.state.department} onChange= {this.handleChange} className="form-control"/><br/>
                </div>

                <div className="form-group"> 
                <input type = 'submit' value = 'Add' className="form-control"/>
                </div>
             </form>
             </div>  
             )  :  (
            <h1> Loading </h1>
              )
            }
         </div>
     )
 }
}

const mapStateToProps = (state)=>{
    return {
        department : state.departments.find(department=>department._id == localStorage.getItem('departId1'))
    }
}
export default connect(mapStateToProps)(DepartmentEdit)