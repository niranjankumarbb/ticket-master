import axios from 'axios'

export const startPostEmployee = (formData)=>{
    console.log('employeesAction entered startPostEmployees')
  return (dispatch)=>{
      axios.post('http://dct-ticket-master.herokuapp.com/employees', formData, {
          headers : {
              'x-auth' : localStorage.getItem('authToken1')
          }
      })
      .then(response=>{
          console.log('employeesAction post response' ,response.data)
          dispatch(startGetEmployees())
      })
      .catch(err=>{
          console.log('employeesAction startPostEmployees error', err)
      })
  }
}

export const startGetEmployees = ()=>{
    return (dispatch)=>{
        axios.get('http://dct-ticket-master.herokuapp.com/employees', {
            headers : {
                'x-auth' : localStorage.getItem('authToken1')
            }
        })
        .then(response=>{
            console.log('employeesAction get response', response.data)
            dispatch(setEmployees(response.data))
        })
        .catch(err=>{
            console.log('employeesAction startGetEmployees error', err)
        })
    }
}

export const startRemoveEmployee= (id)=>{
    console.log('entered employeesAction startRemoveEmployee')
    return (dispatch)=>{
        axios.delete(`http://dct-ticket-master.herokuapp.com/employees/${id}`, {
            headers : {
                'x-auth' : localStorage.getItem('authToken1')
            }
        })
        .then(response=>{
            console.log('employeesAction startRemoveEmployee delete response', response.data)
            window.alert('Successfully removed')
            dispatch(startGetEmployees())
        })
    }
}

export const startPutEmployee = (id,formData, redirect)=>{
    console.log('employeeaction put entered')
    return (dispatch)=>{
        axios.put(`http://dct-ticket-master.herokuapp.com/employees/${id}`, formData, {
            headers : {
                'x-auth' : localStorage.getItem('authToken1')
            }
        })
        .then(response=>{
            console.log('putEmployee', response.data)
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.errors)
            } else {
                alert('Successfully updated')
                dispatch(startGetEmployees())
                 redirect()
                  }
            })            
    }
}

export const setEmployees= (data)=>{
    return { type : 'SET_EMPLOYEES', payload : data}
}