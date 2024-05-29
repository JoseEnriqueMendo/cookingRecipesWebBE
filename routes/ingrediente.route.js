const router = require('express').Router();
const {
  getall,
  createIngrediente,
  getone,
  deleteIngrediente,
  editIngrediente,
} = require('../controllers/ingrediente.controller');

router.route('/get').get(getall);
router.route('/get/:id').get(getone);
router.route('/create').post(createIngrediente);
router.route('/edit').put(editIngrediente);
router.route('/delete').delete(deleteIngrediente);

module.exports = router;
