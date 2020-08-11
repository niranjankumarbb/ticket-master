import axios from 'axios'
 
export const startPostCustomer = (formData, redirect)=>{
     return (dispatch)=>{
         axios.post('http://dct-ticket-master.herokuapp.com/customers', formData, {
             headers : {
                 'x-auth' : localStorage.getItem('authToken1')
                }
         })
         .then(response=>{
             console.log('postCustomer', response.data)
             if(response.data._id){
                  dispatch(startGetCustomer())
                   redirect()
                 } else {
                    window.alert('Error')
                }
             })       
     }
}

export const startGetCustomer = ()=>{
    return (dispatch)=>{
        axios.get('http://dct-ticket-master.herokuapp.com/customers', {
            headers : {
                'x-auth' : localStorage.getItem('authToken1')
              }
        })
        .then(response=>{
            console.log('getCustomer', response.data)
            if(response.data.length>=0){
                 dispatch(setCustomers(response.data))                  
                } else {
                   window.alert('Error - Invalid response')
               }
            })          
        }
}

export const startRemoveCustomer = (id)=>{
    return (dispatch)=>{
        axios.delete(`http://dct-ticket-master.herokuapp.com/customers/${id}`, {
              headers : {
                  'x-auth' : localStorage.getItem('authToken1')
              }
        })
        .then(response=>{
            console.log('Removed customer response in customerAction', response.data)
            window.alert('Successfully deleted')
            dispatch(startGetCustomer())
        })
    }
}

export const startPutCustomer = (id,formData, redirect)=>{
    return (dispatch)=>{
        axios.put(`http://dct-ticket-master.herokuapp.com/customers/${id}`, formData, {
            headers : {
                'x-auth' : localStorage.getItem('authToken1')
            }
        })
        .then(response=>{
            console.log('postCustomer', response.data)
            if(response.data.hasOwnProperty('errors')){
                alert(response.data.errors)               
             } else {
                alert('Successfully updated')
                dispatch(startGetCustomer())
                 redirect()
                  }
            })           
     }
}

export const setCustomers =(data)=>{
    return { type : 'SET_CUSTOMERS', payload : data}
}


 