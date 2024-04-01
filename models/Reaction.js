const { Schema } = require("mongoose");
// Import dateFormat if it's defined elsewhere
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    // set up fields for the reaction model
    {
        // required field to create a unique id for each reaction
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp) // Corrected timestamp variable
        }
    },
    {
        toJSON: {
            getters: true,
        },
        id: false // Move id: false here
    }
);

module.exports = ReactionSchema;