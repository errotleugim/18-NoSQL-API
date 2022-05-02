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
router.route('/')
  .get(getUsers)
  .post(createUser);

// /api/students/:studentId
router.route('/:id')
  .get(getSingleUser)
  .delete(deleteUser);

// friends
router.route('/:userId/friends')
  .post(addFriend);

// friends/friendid
router.route('/:userId/friends/:friendId')
  .delete(deleteFriend);

module.exports = router;
