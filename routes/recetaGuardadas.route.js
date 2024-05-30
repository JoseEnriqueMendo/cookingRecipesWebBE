const router = require('express').Router();

const {
  createRecetasGuardadas,
  deleteRecetasGuardadas,
  getRecetasGugetardadasUser,
} = require('../controllers/recetaGuardadas.controller');

router.route('/getThisUser').get(getRecetasGugetardadasUser);
router.route('/create').post(createRecetasGuardadas);
router.route('/delete').delete(deleteRecetasGuardadas);

module.exports = router;
