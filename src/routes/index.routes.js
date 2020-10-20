const { Router } = require('express');
const router = Router();

const {sendMessage} = require('../twilio/send-sms')

const SMS = require('../models/sms')

router.get('/', async (req, res) => {
    const messages = await SMS.find().lean();
    messages.forEach(m => console.log(m.Body))
    res.render('index', { messages })
})

router.post('/send-sms', async (req, res) => {

    const {message, phone} = req.body

    if(!message || !phone) return res.json('Missing message or phone')

    const result = await sendMessage(req.body.message, req.body.phone);

    console.log(result.sid)

    await SMS.create({Body: req.body.message, To: req.body.phone})

    res.redirect('/');
})

module.exports = router;