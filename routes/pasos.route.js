const router = require("express").Router();
const {
  createSteps,
  editSteps,
  deleteStepsByRecipeId,
  getStepsByRecipeId,
} = require("../controllers/pasos.controller");
// IMPORTAR EL CONTROLLER

router.route("/create").post(createSteps);
router.route("/edit/:id").patch(editSteps);
router.route("/getById/:id").get(getStepsByRecipeId);
router.route("/delete/:id").delete(deleteStepsByRecipeId);

module.exports = router;
