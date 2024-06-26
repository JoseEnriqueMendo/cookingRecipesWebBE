const router = require('express').Router();
const {
  createUser,
  getall,
  getone,
  deleteUser,
  updateUser,
  login,
  getThis,
  verifyToken,
  getUserByEmail,
  createGoogleUser,
  loginGoogle,
} = require('../controllers/auth.controller');

router.route('/getall').get(getall);
router.route('/verify').get(verifyToken);
router.route('/getone/:id').get(getone);
router.route('/getThis').get(getThis);
router.route('/register').post(createUser);
router.route('/login').post(login);
router.route('/edit').patch(updateUser);
router.route('/delete').delete(deleteUser);
router.route('/getByEmail/:email').get(getUserByEmail);
router.route('/register/google').post(createGoogleUser);
router.route('/login/google').post(loginGoogle);

module.exports = router;
