import React from 'react'
import {connect} from 'react-redux'
import {startPostDepartment } from '../actions/departmentsAction'

class AddDepartment extends React.Component{
    constructor(){
        super()
        this.state = {
            department : ''
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
        this.props.dispatch(startPostDepartment(formData))
    }

    render(){
     return (
         <div  >
             <br/> <br/> <br/>
             <h1> Add Department</h1>
             <form onSubmit= {this.handleSubmit}>
                 <div className="form-group">
                 <input type= "text" value= {this.state.department} onChange= {this.handleChange} className="form-control"/>
                 </div>

                 <div className="form-group">
                 <input type = 'submit' value = 'Add'  className="form-control"/>
                 </div>
             </form>
         </div>
     )
 }
}

const mapStateToProps = (state)=>{
    return {
        departments : state.departments
    }
}
export default connect(mapStateToProps)(AddDepartment)