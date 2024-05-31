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
router.route("/delete/:id").delete(deleteStepsByRecipeId);
router.route("/getById/:id").delete(getStepsByRecipeId);

module.exports = router;
