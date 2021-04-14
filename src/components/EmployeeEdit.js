import React from 'react'
import {connect} from 'react-redux'
import {startPutEmployee} from '../actions/employeesAction'

class EmployeeEdit extends React.Component{
    constructor(props){
        super()
        this.state= {
            name : props.employee.name,
            email: props.employee.email,
          mobile : props.employee.mobile,
      department : props.employee.department.name,
        }
    }

    handleChange = (e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }    

    handleSubmit = (e)=>{
         e.preventDefault()
        const deptId = this.props.departments.find(dep=>dep.name== this.state.department)._id
        const empId= localStorage.getItem('empId1')
        const formData ={
             name   : this.state.name,
             email  : this.state.email,
             mobile : this.state.mobile,
        department  : deptId
         }
         const redirect = ()=>{
            console.log('redirect function entered')
            return  this.props.history.push('/employees')           
        }
        this.props.dispatch(startPutEmployee(empId,formData, redirect)) 
    }

    render(){
        console.log('EmployeeEdit state', this.state)
        return(
            <div>
                {this.props.departments? (
                 <div>
                <h1> Add Employee</h1>
                <form onSubmit={this.handleSubmit}>

                <div className="form-group">
                <label>Name</label>
                <br/>
                <input type='text' name='name' value={this.state.name} onChange= {this.handleChange} className="form-control"/>
                <br/> <br/> <br/>
                </div>

                <div className="form-group">
                <label>Email</label>
                <br/>
                <input type='text' name='email' value={this.state.email} onChange= {this.handleChange} className="form-control"/>
                <br/> <br/> <br/>
                </div>

                <div className="form-group">
                <label>Mobile</label>
                <br/>
                <input type='number' name='mobile' value={this.state.mobile} onChange= {this.handleChange} className="form-control"/>
                <br/> <br/> <br/>
                </div>

                <div className="form-group">
                 <label>Department</label>
                <br/>
                <select name='department'  value={this.state.department} onChange= {this.handleChange} className="form-control">
                    <option value=''>--select--</option>
                    {this.props.departments.map((department,i)=>{
                         return (
                            <option key={i} value={department.name} >{department.name}</option>
                         )
                    })}
                 </select>   
                <br/> <br/> <br/>
                </div>

                <div className="form-group">
                <input type='submit' value='Submit' className="form-control"/>
                </div>            
                </form>
               </div>

                ) : (
                    <h1> Loading... </h1>
                )
               }
            </div>
        )
    }
}

const mapStateToProps = (state,props)=>{
    return {
    employee : state.employees.find(employee=>employee._id == localStorage.getItem('empId1')),
    departments : state.departments 
    }
}

export default connect(mapStateToProps)(EmployeeEdit)