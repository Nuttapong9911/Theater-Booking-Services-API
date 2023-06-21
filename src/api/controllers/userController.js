// const {v4} = require('uuid')
const axios = require('axios')

const register = async (userData) => {
    try {
        const response = await axios.post('http://auth_service:4001/register', {
            firstname: userData.firstname,
            lastname: userData.lastname,
            email: userData.username,
            password: userData.password
            })
            // console.log(err.response.status.toString())   
            // return{httpCode: err.response.status.toString(), message: err.response.statusText}   
        
        return{httpCode: response.status, message: response.statusText}
    } catch (error) {
        console.log(error)
        return{httpCode: error.response.status, message: error.response.data}   
    }
}

const login = async (userData) => {
    try {
        const response = await axios.post('http://auth_service:4001/login', {
            email: userData.username,
            password: userData.password
        })
        // console.log(response)  
        return{httpCode: response.status, message: response.statusText, token: response.data.token}
    } catch (error) {
        console.log(error)
        return{httpCode: error.response.status, message: error.response.data}   
    }
}

const decodedToken = async (token) => {
    try {
        const response = await axios.get('http://auth_service:4001/decodetoken', {params: {
            token: token
        }})
        // console.log(response.status === 200)
        if(response.status === 200)
            return {
                user_id: response.data.user_id,
                firstname: response.data.firstname,
                lastname: response.data.lastname
            }
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    register,
    login,
    decodedToken
}