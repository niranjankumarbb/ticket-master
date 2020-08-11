import axios from "axios"

export const startPostDepartment = (depart)=>{
    return (dispatch)=>{    
      axios.post('http://dct-ticket-master.herokuapp.com/departments' , depart, {
          headers : {
              'x-auth' : localStorage.getItem('authToken1')
          }
      })
      .then(response=>{
          console.log('department post to db', response.data)
          if(response.data._id ){
            dispatch(startGetDepartments())
          } 
      })
      .catch(err=>{
          console.log(err)
          window.alert('Department validation failed')
      })
   }
}

export const startGetDepartments = ()=>{
     return (dispatch)=>{
         axios.get('http://dct-ticket-master.herokuapp.com/departments', {
             headers : {
                 'x-auth' : localStorage.getItem ('authToken1')
             } 
         })
          .then(response=>{
              console.log('startGetDepartments', response.data)
                   dispatch(setDepartments(response.data))               
          })
          .catch(err=>{
              console.log('startGetDepartments error')
          })
     }
}

export const startRemoveDepartment= (id)=>{
    return (dispatch)=>{
        axios.delete(`http://dct-ticket-master.herokuapp.com/departments/${id}` ,{
            headers : {
                'x-auth' : localStorage.getItem('authToken1')
            }
        })
        .then(response=>{
            console.log('removed department data from server', response.data)
            window.alert('Successfully deleted')
            dispatch(startGetDepartments())
        })
        .catch(err=>{
            console.log('startRemoveDepartment', err)
        })
    }
}


export const startPutDepartment = (id,formData, redirect)=>{
    return (dispatch)=>{
        axios.put(`http://dct-ticket-master.herokuapp.com/departments/${id}`, formData, {
            headers : {
                'x-auth' : localStorage.getItem('authToken1')
            }
        })
        .then(response=>{
            console.log('putDepartment', response.data)
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.errors)                 
             } else {
                alert('Successfully updated')
                dispatch(startGetDepartments())
                 redirect()
                  }
            })            
    }
}

export const setDepartments = (data)=>{
    return { type : 'SET_DEPARTMENTS', payload : data}
}

