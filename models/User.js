const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: { type: String },
    isAdmin: { type: Boolean, default: false },
}, { timestamps: true });



module.exports = mongoose.model('User', userSchema);
