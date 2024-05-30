const router = require("express").Router();
const {
  createRecipe,
  editRecipe,
  getall,
  deleteRecipe,
} = require("../controllers/receta.controller");

router.route("/create").post(createRecipe);
router.route("/edit/:id").patch(editRecipe);
router.route("/getall").get(getall);
router.route("/delete/:id").delete(deleteRecipe);

module.exports = router;
