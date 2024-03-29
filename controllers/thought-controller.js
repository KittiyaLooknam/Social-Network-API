const { thought, User } = require('../models');

const thoughtController = {
    // Get all thoughts
    getThoughts(req, res) {
        thought.find()
            .sort({ createdAt: -1 })
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Get single thought by ID
    getSingleThought(req, res) {
        thought.findOne({ _id: req.params.thoughtId })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'No Thought found with this id' });
                }
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // Create a new thought
    createThought(req, res) {
        thought.create(req.body)
            .then((dbThoughtData) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: dbThoughtData._id } },
                    { new: true }
                );
            })
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user found with this id!' });
                }
                return res.json({ message: "Thought created!", data: dbUserData });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Update a thought by its _id
    updateThought(req, res) {
        thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: "No thought found with this id!" });
                }
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // Delete a Thought by its Id
    deleteThought(req, res) {
        thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: "No thought found with this id!" });
                }
                res.json({ message: 'Deleted the thought' });
            })
            .catch(err => {
                res.status(500).json(err);
            });
    },

    // Remove thought id from user's `thoughts` field
    removeThoughtFromUser(req, res) {
        User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
        )
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user found!' });
                }
                res.json({ message: "Successfully deleted the thought!", data: dbUserData });
            })
            .catch((err) => res.status(500).json(err));
    },

    // Add a reaction to a thought
    addReaction(req, res) {
        thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'No thought found with this id!' });
                }
                res.json(dbThoughtData);
            })
            .catch((err) => res.status(500).json(err));
    },

    // Remove reaction from a thought
    removeReaction(req, res) {
        thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'No Thought found with this id!' });
                }
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    }
};

module.exports = thoughtController;