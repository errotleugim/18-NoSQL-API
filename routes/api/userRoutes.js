const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController');

// /api/students
router.route('/').get(getUsers).post(createUser);

// /api/students/:studentId
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// friends
router.route('/:userId/thoughts').post(addFriend);

// /api/students/:studentId/assignments/:assignmentId
router.route('/:userId/thoughts/:assignmentId').delete(deleteFriend);

module.exports = router;
