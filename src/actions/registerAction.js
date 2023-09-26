import axios from 'axios'

export const startRegisterUser = (formData, redirect) => {
    return (dispatch) => {
        axios.post('http://dct-ticket-master.herokuapp.com/users/register', formData)
            .then(response => {
                 if (response.data._id) {
                    redirect()
                } else {
                    window.alert('User validation failed')
                }
            })
            .catch(err => {
                console.log('display error', err)
            })
    }
}




