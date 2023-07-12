const axios = require('axios')

const getTheater = async(input) => {
    try {
        const response = await axios.get('http://entity_service:4003/gettheaterbyid', {params:{
            _theaterID: input._theaterID
            }})
            .catch(err => {
                console.log(err)
        })
        return {data: response.data}
    } catch (error) {
        console.log(error)
    }
}

const getTheaterByName = async(input) => {
    try {
        const response = await axios.get('http://entity_service:4003/gettheaterbyname', {params:{
            theater_name: input.theater_name
            }})
            .catch(err => {
                console.log(err)
        })
        return {data: response.data}
    } catch (error) {
        console.log(error)
    }
}

const getAllTheater = async() => {
    try {
        const allTheatersResponse = await axios.get('http://entity_service:4003/getalltheater')

        return {data: allTheatersResponse.data}
    } catch (error) {
        console.log(error)
    }
}

const createTheater = async(input) => {
    try {
        const createResponse = await axios.post('http://entity_service:4003/createtheater', {
            theater_name: input.theater_name,
            description: input.description
            })
            .catch(err => {
                console.log(err)
        })

        return {
            httpCode: createResponse.status,
            message: createResponse.statusText
        }
    } catch (error) {
        console.log(error)
    }
}

const editTheaterByID = async (input) => {
    try {
        const editResponse = await axios.put('http://entity_service:4003/edittheaterbyid', {
            _theaterID: input._theaterID,
            theater_name: input.theater_name,
            description: input.description
            })
            .catch(err => {
                console.log(err)
        })

        return {
            httpCode: editResponse.status,
            message: editResponse.statusText
        }
    } catch (error) {
        console.log(error)
    }
}

const deleteTheaterByID = async (input) => {
    try {
        const deleteResponse = await axios.delete('http://entity_service:4003/deletetheater', {
            params: {
                _theaterID: input._theaterID,
            }
        })

        return {
            httpCode: deleteResponse.status,
            message: deleteResponse.statusText
        }
    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    getTheater,
    getTheaterByName,
    getAllTheater,
    createTheater,
    editTheaterByID,
    deleteTheaterByID
}