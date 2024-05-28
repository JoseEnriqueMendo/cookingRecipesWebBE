const router = require('express').Router();
const { createUser, getall } = require('../controllers/auth.controller');

// REGISTER
router.route('/getall').get(getall);
router.route('/regitster').post(createUser);

module.exports = router;
