const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
} = require('../../controllers/ThoughtController.js');

// /api/thoughts
router.route('/')
.get(getAllThoughts)
.post(createThought);

// /api/courses/:courseId
router
  .route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);



router.route('/:thoughtId/reactions')
  .post(addReaction);


router.route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);


module.exports = router;
