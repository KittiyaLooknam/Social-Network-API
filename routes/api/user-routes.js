const router = require('express').Router();
const { 
  getAllUsers,
  getSingleUser, // Update method name here
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend } = require('../../controllers/user-controller');

// /api/users
router
  .route('/')
  .get(getAllUsers) 
  .post(createUser);

// /api/users/:Id
router
  .route('/:id')
  .get(getSingleUser) // Update method name here
  .put(updateUser)
  .delete(deleteUser);

// /api/users/:userId/friends/:friendId
router
  .route('/:id/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend);

module.exports = router;