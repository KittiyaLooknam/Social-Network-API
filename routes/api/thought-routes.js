const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThoughth,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts
router.route('/')
    .get(getThoughts)
    .post(createThought);

// /api/thought/:id
router.route('/:thoughtid',)
    .get(getSingleThought)
    .put(updateThoughth)
    .delete(deleteThought);

// api/thought/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// DELETE to remove a reaction by the reaction ID
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;
