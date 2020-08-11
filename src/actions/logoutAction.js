import axios from 'axios'

export const  startLogout =()=>{
    return (dispatch)=>{
  axios.delete('http://dct-ticket-master.herokuapp.com/users/logout', {
      headers : {
          'x-auth' : localStorage.getItem('authToken1')
      }
  })
    .then(response=>{
          if(response.data.notice){
             alert(response.data.notice)
             localStorage.removeItem('authToken1')
             dispatch(setUser({}))
             window.location.href='/'
          } 
    })
  }
}

export const setUser=(data)=>{
    return {type : 'SET_LOGOUT', payload : data}
}
