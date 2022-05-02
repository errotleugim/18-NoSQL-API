const router = require('express').Router();
const {
    getAllThoughts,
    addThought,
    getThoughtById,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtController');
const { route } = require('./userRoutes');

// /api/thoughts
router.route('/').get(getAllThoughts);

// /api/thoughts
router.route('/:userId').post(addThought);

// /api/thoughts
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)

// /api/thoughts/:userId
router
    .route('/:userId/:thoughtId')
    .delete(deleteThought);

// /api/thoughts/:thoughtId
router
    .route('/:thoughtId/reactions')
    .post(addReaction);

// /api/:thoughtId/reactions/
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;