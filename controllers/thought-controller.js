const { thought, User } = require('../models');

const thoughtController = {
    // Get all thoughts
    getAllThoughts(req, res) {
        thought.find({})
            .populate({
                path: 'user',
                select: '-__v'
            })
            .select('-__v')
            .sort({ createAt: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // Get a single thought by its id
    getThoughtById({ params }, res) {
        thought.findOne({ _id: params.id })
            .populate({
                path: 'thought.user',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: "No Thought found with this ID" });
                }
                res.json(dbThoughtData)
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400).json(err);
            });
    },

    // Create a new thought
    createThought({ body }, res) {
        thought.create(body)
            .then(({ _id }) => {
                return user.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                )
            }).then((dbUserData) => {

                if (!dbUserData) {
                    return res.status(404).json({ message: "No User found with this Id!" })
                }
                res.json({ message: 'Thought created successfully!' });
            })
            .catch((err) => res.json(err));
    },

    //   Update a thought by its id
    updateThought({ params, body }, res) {
        thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: "No Thought found with this id!" });
                }
                res.json(dbThoughtData);
            })
            .catch((err) => res.status(400).json(err));
    },

    // Delete a thought by its id
    deleteThought({ params, body }, res) {
        thought.findOneAndDelete({ _id: params.id }) // Changed to findOneAndDelete to directly delete the thought
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: "No Thought with this id!" });
                }
                // Once the thought is deleted, remove its reference from the associated user
                return User.findOneAndUpdate(
                    { _id: deletedThought.userId },
                    { $pull: { thoughts: params.id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({ message: "No user found with this UserId!" });
                }
                res.json({ message: "Thought has been removed from the user's list." });
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // POST create a reaction stored in a single thought's reactions array field
    addReaction({ params, body }, res) {
        thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'No Thought found with this Id!' })
                }
                res.json(dbThoughtData)
            }).catch(err => res.json(err))
    },
    // DELETE to pull and remove a reaction by the reactionId,
    removeReaction({ params, body }, res) {
        thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        ).then(dbThoughtData => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: "No Thought found with this id!" })
            }
            res.json(dbThoughtData)
        }).catch(err => res.json(err))
    }
};

module.exports = thoughtController;

