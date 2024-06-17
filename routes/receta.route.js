const router = require('express').Router();
const {
  createRecipe,
  editRecipe,
  getall,
  deleteRecipe,
  getRecipeById,
  getallOfUser,
} = require('../controllers/receta.controller');

router.route('/create').post(createRecipe);
router.route('/edit/:id').patch(editRecipe);
router.route('/getall').get(getall);
router.route('/delete/:id').delete(deleteRecipe);
router.route('/get/:id').get(getRecipeById);
router.route('/getThisUser').get(getallOfUser);

module.exports = router;
