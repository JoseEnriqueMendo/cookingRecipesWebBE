const router = require('express').Router();
const {
  createSteps,
  editSteps,
  deleteStepsByRecipeId,
  getStepsByRecipeId,
  deleteSteps,
} = require('../controllers/pasos.controller');
// IMPORTAR EL CONTROLLER

router.route('/create').post(createSteps);
router.route('/edit/:id').patch(editSteps);
router.route('/getById/:id').get(getStepsByRecipeId);
router.route('/deleteByRecipe/:id').delete(deleteStepsByRecipeId);
router.route('/delete/:id').delete(deleteSteps);

module.exports = router;
