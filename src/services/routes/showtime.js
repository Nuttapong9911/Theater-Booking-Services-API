const express = require('express');
const showtimeController = require('../controllers/showtime');

const router = express.Router()

router.get('/getshowtimebyid', showtimeController.getShowtimeByID)
router.post('/createshowtime', showtimeController.createShowtime)
router.put('/editshowtimebyid', showtimeController.editShowtimeByID)
router.delete('/deleteshowtimebyid', showtimeController.deleteShowtimeByID)
router.get('/getshowtimebydate', showtimeController.getShowtimeByDate)

router.get('/', async (req, res) => {
    res.status(200).send('hello showtime')
})

module.exports = router