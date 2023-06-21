const express = require('express');
const entityController = require('../controllers/entity')

const router = express.Router()

router.get('/getallmovie', entityController.getAllMovie)
router.get('/getmoviebyid', entityController.getMovieByID)
router.get('/getmoviebyname', entityController.getMovieByName)
router.post('/createmovie', entityController.createMovie)
router.put('/editmoviebyid', entityController.editMovieByID)
router.delete('/deletemovie', entityController.deleteMovieByID)

router.get('/getalltheater', entityController.getAllTheater)
router.get('/gettheaterbyid', entityController.getTheaterByID)
router.get('/gettheaterbyname', entityController.getTheaterByName)
router.post('/createtheater', entityController.createTheater)
router.put('/edittheaterbyid', entityController.editTheaterByID)
router.delete('/deletetheater', entityController.deleteTheaterByID)

router.get('/', (req, res) => {
    res.status(200).send('hello entity')
})

module.exports = router