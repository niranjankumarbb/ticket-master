import axios from 'axios'

export const startPostTicket = (formData, redirect)=>{
    return (dispatch)=> {
        axios.post('http://dct-ticket-master.herokuapp.com/tickets', formData, {
            headers : {
              'x-auth' : localStorage.getItem('authToken1')
            }
        })
        .then(response=>{
            console.log('startPostTicket response', response.data)
            if( response.data.hasOwnProperty('errors')){
                alert(response.data.message)
            } else {
                dispatch(startGetTickets())
                 redirect()
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

export const startGetTickets = ()=>{
    return (dispatch)=>{
        axios.get('http://dct-ticket-master.herokuapp.com/tickets', {
            headers : {
                'x-auth': localStorage.getItem('authToken1')
            }
        })
        .then(response=>{
            console.group('startGetTickets response data', response.data)
             if(response.data.hasOwnProperty('errors')){
                 alert(response.data.message)
             }else {
                 dispatch(setTokens(response.data))
             }
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

export const startRemoveTicket= (id)=>{
    return (dispatch)=>{
    axios.delete(`http://dct-ticket-master.herokuapp.com/tickets/${id}`, {
        headers : {
            'x-auth' : localStorage.getItem('authToken1')
        }
    })
    .then(response=>{
        console.log('startRemoveTicket response', response.data)
        if(response.data.hasOwnProperty('errors')){
            alert(response.data.message)
        }else {
            alert('Successfully removed')
            dispatch(startGetTickets())
        }
    })
  }
}

export const startPutTicket = (id,data)=>{
    console.log('entered startPutTicket')
    return (dispatch=>{
    axios.put(`http://dct-ticket-master.herokuapp.com/tickets/${id}`, data,{
        headers : {
            'x-auth' : localStorage.getItem('authToken1')
        }
    })
    .then(response=>{
        console.log('startPutTicket response', response.data)
        if(response.data.hasOwnProperty('errors')){
            alert(response.data.message)
        }else {
            dispatch(startGetTickets())
        }
    })
 })
}

export const setTokens= (data)=>{
    return { type : 'SET_TOKENS', payload : data}
}