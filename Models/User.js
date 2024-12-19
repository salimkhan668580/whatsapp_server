const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
       type: String,
    required: true,
    unique: true,
    lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    hashpassword: {
        type: String,
        required: true,
        minlength: 8,

    },
 

},
{
    timestamps: true,
})

const User = mongoose.model('User', userSchema);

module.exports = User;
