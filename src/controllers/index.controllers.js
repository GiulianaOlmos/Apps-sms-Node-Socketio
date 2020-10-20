const sms = require("../models/sms")
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const {sendMessage} = require('../twilio/send-sms')

const SMS = require('../models/sms')


const indexController = async (req, res) => {
    const messages = await sms.find().lean()
    res.render('index', {messages})
}

const postMessage = async (req, res) => {
    const {message, phone} = req.body

    if(!message || !phone) return res.json('Missing message or phone')

    const result = await sendMessage(req.body.message, req.body.phone);

    console.log(result.sid)

    await SMS.create({Body: req.body.message, To: req.body.phone})

    res.redirect('/');
}

const receiveMessage = async (req, res) => {
    console.log(req.body.Body);

    const saveSMS = await SMS.create({
        Body: req.body.Body,
        From: req.body.From
    })

    const twilml = new MessagingResponse();

    twilml.message('This is my response')

    res.send(twilml.toString())
}

module.exports = {
    indexController,
    postMessage,
    receiveMessage
}