const {Schema, model} = require('mongoose');

new Schema({
    body: {
        type: String,
        required: true,
    },
    from: {
        type: String, 
    },
}, {
    timestamps: true,
})
