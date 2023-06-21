const axios = require('axios')
const Ticket = require('../models/ticket')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const getAll = async(req,res) => {
    res.status(200).json(await Ticket.find())
}

const getTicketByUserID = async (req, res) => {
    const { _userID } = req.body
    if(!_userID){
        res.status(400).send('_userID is required')
        return;
    }

    const tickets = await Ticket.find({_userID: _userID})
    if(tickets){
        res.status(200).json(tickets)
    }else{
        res.status(400).json("tickets not found")
    }
}

const getTicketByShowtime = async (req, res) => {
    const { _showID } = Object.keys(req.query).length === 0 ? req.body : req.query
    if (!_showID){
        res.status(400).send('_showID is required')
        return;
    }

    const ticket = await Ticket.find({_showID})
    if(ticket){
        res.status(200).json(ticket)
    }else{
        res.status(400).json("ticket not found")
    }
}

const getTicketByRefCode = async (req, res) => {
    const { reference_code } = Object.keys(req.query).length === 0 ? req.body : req.query
    if (!reference_code){
        res.status(400).send('refCode is required')
        return;
    }

    const ticket = await Ticket.findOne({reference_code})
    if(ticket){
        res.status(200).json(ticket)
    }else{
        res.status(400).json("ticket not found")
    }
}

const createTicket = async (req, res) => {

    const { _userID ,_showID, seat_type, row, column } = Object.keys(req.query).length === 0 ? req.body : req.query
    if(!(_userID && _showID && seat_type && row && column)){
        res.status(400).send('All input is required')
        return;
    }

    // check if showtime is exist
    const showtime = await axios.get('http://showtime_service:4002/getshowtimebyid', {params: {_showID}})
            .catch(err => {
                console.log(err)
    })
    if(!showtime){
        res.status(400).send("Showtime not found")
        return;
    }
    
    // - check if the selected seat is booked
    const ticketWithSameSeat = await Ticket.findOne({
        _id: showtime._id,
        seat_type,
        row,
        column,
        status: 'BOOKED'
    })
    if(ticketWithSameSeat){
        res.status(400).send("the seat is already booked")
        return
    }

    // - create ticket
    const ticket = await Ticket.create({
        _userID,
        reference_code: new mongoose.Types.ObjectId,
        status: 'BOOKED',
        _showID,
        seat_type,
        row,
        column,
        paid_date: new Date()
    })
    res.status(200).json(ticket)
}

const editTicketByShowtimeAndPos = async (req, res) => {
    try {
        const { _showID,  row, column , status} = Object.keys(req.query).length === 0 ? req.body : req.query
        const ticket = await Ticket.findOne({_showID, row, column})
        if(!ticket){
            res.status(400).send("Ticket not found")
        }else{
            const editTicket = await Ticket.updateOne({_showID, row, column}, {status})
            res.status(200).json(ticket)
        }

    } catch (error) {
        console.log(error)
    }
}

const deleteTicket = async (req, res) => {
    const { _ticketID } = Object.keys(req.query).length === 0 ? req.body : req.query
    const ticket = await Ticket.deleteOne({_id: _ticketID})
    if(ticket){
        res.status(200).json(ticket)
    }else{
        res.status(400).send("Ticket not found")
    }
}

module.exports = {
    getAll,
    getTicketByUserID,
    getTicketByShowtime,
    getTicketByRefCode,
    createTicket,
    deleteTicket,
    editTicketByShowtimeAndPos
}