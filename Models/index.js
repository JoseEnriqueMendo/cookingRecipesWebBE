const { User } = require('./User.model');
const { ingrediente } = require('./ingrediente.model');
const { ingredientereceta } = require('./ingredienteReceta.model');
const { pasosreceta } = require('./pasos.model');
const { RecetaModel } = require('./receta.model');
const { recetasGuardadas } = require('./recetasGuardadas.model');

const asociacionesModels = () => {
  recetasGuardadas.belongsTo(RecetaModel, {
    foreignKey: 'receta_id',
    as: 'receta',
  });
  recetasGuardadas.belongsTo(User, { foreignKey: 'user_id', as: 'User' });

  ingredientereceta.belongsTo(ingrediente, {
    foreignKey: 'ingrediente_id',
    as: 'ingrediente',
  });
  ingredientereceta.belongsTo(RecetaModel, {
    foreignKey: 'receta_id',
    as: 'receta',
  });

  RecetaModel.belongsTo(User, { foreignKey: 'user_id', as: 'User' });

  RecetaModel.hasMany(ingredientereceta, {
    foreignKey: 'receta_id',
    as: 'ingredientesReceta',
  });

  // ingredientereceta.belongsTo(RecetaModel, { foreignKey: "receta_id" });

  ingredientereceta.belongsTo(ingrediente, {
    foreignKey: 'ingrediente_id',
    as: 'ingredienteIngredienteReceta',
  });
  ingrediente.hasMany(ingredientereceta, {
    foreignKey: 'ingrediente_id',
    as: 'ingredientesRecetaIngrediente',
  });
};

module.exports = { asociacionesModels };
