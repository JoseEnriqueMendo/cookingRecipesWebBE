const router = require('express').Router();

const {
  createRecetasGuardadas,
  deleteRecetasGuardadas,
  getRecetasGuardadasUser,
  deleteRecetasGuardadasByRecipe,
} = require('../controllers/recetaGuardadas.controller');

router.route('/getThisUser').get(getRecetasGuardadasUser);
router.route('/create').post(createRecetasGuardadas);
router.route('/delete/:id').delete(deleteRecetasGuardadas);
router.route('/deleteAllbyRecipe/:id').delete(deleteRecetasGuardadasByRecipe);

module.exports = router;
