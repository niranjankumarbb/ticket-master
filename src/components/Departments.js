import React from 'react'
import {connect} from 'react-redux'
import AddDepartment from './AddDepartment'
import {startGetDepartments , startRemoveDepartment} from '../actions/departmentsAction'

class Departments extends React.Component{

    componentDidMount(){
        this.props.dispatch(startGetDepartments())
    }

    handleRemove = (id)=>{
        const confirmed= window.confirm('Are you sure you want to remove')
        if(confirmed){
        this.props.dispatch(startRemoveDepartment(id))
        }
    }

    handleShow = (id)=>{
        localStorage.setItem('departId1', id)
        this.props.history.push(`/departments/${localStorage.getItem('departId1')}`)
    }

    render(){
        return(
            <div>
             <h2> Departments - {this.props.departments.length} </h2>
             <table border = '1'>
                 <tbody>
                       {
                         this.props.departments.map((depart, i)=>{
                             return (
                                 <tr key = {i}>
                                     <td> {depart.name}                 
                                         <button onClick= {()=>{
                                             this.handleShow(depart._id)}} className="btn btn-primary">show</button>
                                         <button onClick = {()=>{
                                             this.handleRemove(depart._id) }} class="btn btn-danger">remove</button>
                                     </td>
                                 </tr>
                             )
                         })
                     }                     
                 </tbody>
             </table>
             <AddDepartment  />
         </div>
        )
    }
}

const mapStateToProps= (state)=>{
    return {
        departments : state.departments
    }
}
export default connect(mapStateToProps)(Departments)