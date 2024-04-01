const { Schema, model } = require("momgoose");
const ReactionSchema = require("./Reactions");
const dateFormat = require('./utils/dateFormat');

const ThoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'You need to provide a text for your thoughts!',
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: timestamp => dateFormat(timestamp)
        },
        username: {
            type: String,
            required: 'You must provide a user name'
        },
        // use the User model in our ref property
        // this will create a many-to-many relationship between Users and Thoughts models
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);
// Get total count of reactions on retrieval
ThoughtsSchema.virtual('reactionCount').get(function () {
    return this.reactions.reduce((total, reaction) => total + reaction.reactionType.length, 0)
});

const ThoughtsModel = model('thoughts', ThoughtsSchema);

module.exports = ThoughtsModel;