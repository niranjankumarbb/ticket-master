import React from 'react'
import {connect} from 'react-redux'
import {startPostEmployee} from '../actions/employeesAction'

class AddEmployee extends React.Component{
    constructor(){
        super()
        this.state= {
            name : '',
            email: '',
          mobile : undefined,
      department : '',
     }
    }

    handleChange = (e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit= (e)=>{
         e.preventDefault()
         const id =this.props.departments.find(department=>department.name==this.state.department)._id
         console.log('AddEmployee handleSubmit department id', id)
         const formData = {
              name : this.state.name,
              email : this.state.email,
              mobile : this.state.mobile,
              department : id
         }
         this.props.dispatch(startPostEmployee(formData))
         this.props.history.push('/employees')
    }

    render(){
        console.log('AddEmployee state', this.state)
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
                    <h1> Loading </h1>
                )
               }
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        departments : state.departments,
    }
}
export default connect(mapStateToProps)(AddEmployee)