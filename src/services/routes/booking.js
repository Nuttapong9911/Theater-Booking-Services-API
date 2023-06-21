const express = require('express');
const bookingController = require('../controllers/booking')

const router = express.Router()

router.get('/getall', bookingController.getAll)
router.get('/getbyuserid', bookingController.getTicketByUserID)
router.get('/getticketbyshowtime', bookingController.getTicketByShowtime)
router.get('/getticketbyrefcode', bookingController.getTicketByRefCode)
router.post('/createticket', bookingController.createTicket)
router.put('/editticketbyshowtimeandpos', bookingController.editTicketByShowtimeAndPos)
router.delete('/deleteticket', bookingController.deleteTicket)

router.get('/', (req, res) => {
    res.status(200).send('hello booking')
})

module.exports = router