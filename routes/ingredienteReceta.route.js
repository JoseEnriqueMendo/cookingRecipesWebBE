const router = require('express').Router();
const {
  createIngRecipe,
  deletaIngRecipe,
  deleteIngRecipes,
  editIngRecipe,
  getIngRecipes,
  getOneIngRecipe,
} = require('../controllers/ingredienteReceta.controller');

router.route('/get/:id').get(getOneIngRecipe);
router.route('/getByRecipe/:id').get(getIngRecipes);
router.route('/create').post(createIngRecipe);
router.route('/delete/:id').delete(deletaIngRecipe);
router.route('/deleteAll/:id').get(deleteIngRecipes);
router.route('/edit').patch(editIngRecipe);

module.exports = router;
