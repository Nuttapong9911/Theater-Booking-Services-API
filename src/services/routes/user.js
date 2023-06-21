const express = require('express');
// const auth = require('../middleware/auth')

const userController = require('../controllers/user');
const { default: axios } = require('axios');

const router = express.Router()

router.get('/', async (req, res) => {
    // const response =  await axios.get('http://entity_service:4003/getallmovie')
    // res.status(200).json(response.data)

    res.status(200).send("hello authz")
})
router.get('/getuserbyid', userController.getUserByID)
router.get('/decodetoken', userController.decodeToken)

router.post('/register', userController.register)
router.post('/login', userController.login)

router.put('/updateuserbyid', userController.updateUserByID)
router.put('/logout', userController.logout)

router.post('/createadmin', userController.createAdmin)

module.exports = router