const { User } = require('./User.model');
const { ingrediente } = require('./ingrediente.model');
const { ingredientereceta } = require('./ingredienteReceta.model');
const { pasosreceta } = require('./pasos.model');
const { RecetaModel } = require('./receta.model');
const { recetasGuardadas } = require('./recetasGuardadas.model');

const asociacionesModels = () => {
  recetasGuardadas.belongsTo(RecetaModel, { foreignKey: 'receta_id', as: 'receta' });
  recetasGuardadas.belongsTo(User, { foreignKey: 'user_id', as: 'User' });
  ingredientereceta.belongsTo(ingrediente, {
    foreignKey: 'ingrediente_id',
    as: 'ingrediente',
  });
  ingredientereceta.belongsTo(RecetaModel, { foreignKey: 'receta_id', as: 'receta' });

  RecetaModel.belongsTo(User, { foreignKey: 'user_id', as: 'User' });
};

module.exports = { asociacionesModels };
