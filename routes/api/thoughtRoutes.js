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
router.route('/').get(getAllThoughts).post(createThought);

// /api/courses/:courseId
router
  .route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;
