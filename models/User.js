const { Schema, model } = require("mongoose");
const moment  = require('moment');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Unique constraint should be within the same object as other properties
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/.+@.+\..+/, "Please enter a valid email address"]
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
}, {
    toJSON: {
        virtuals: true // 'virtuals' instead of 'viruals'
    },
    id: false
});

// Define the virtual property 'friendCount' using the 'virtual' method, not 'viruals'
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// Create the User model using the userSchema
const User = model('User', userSchema); // Corrected 'modle' to 'model'

module.exports = User;