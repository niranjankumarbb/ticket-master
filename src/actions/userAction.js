import axios from 'axios'

export const startLoginUser= (formData)=>{
    return (dispatch)=>{
        axios.post('http://dct-ticket-master.herokuapp.com/users/login', formData)
        .then(response=>{
             if(response.data.token){
                localStorage.setItem('authToken1', response.data.token)
                window.alert('Successfully logged in')
                dispatch(startGetUser())
             } else {
                window.alert('Invalid email/password')
            }
        })
    }
}

export const startGetUser = ()=>{
    return (dispatch)=>{
        axios.get('http://dct-ticket-master.herokuapp.com/users/account', {
            headers : {
                'x-auth' : localStorage.getItem('authToken1')
            }
        })
        .then(response=>{
              if(response.data.hasOwnProperty('error')){
                 alert(response.data.error)
             }else {
                 dispatch(setUser(response.data))
              }
        })
        .catch(err=>{
            console.log('startGetUser  error', err)
        })
    }
}

export const setUser=(data)=>{
     return { type : 'SET_USER', payload : data}
}
