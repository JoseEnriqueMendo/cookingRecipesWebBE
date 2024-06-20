const { ingrediente } = require('../Models/ingrediente.model');
const ServiceResponse = require('../helpers/serviceResponse');
const { RecetaModel } = require('../Models/receta.model');
const { ingredientereceta } = require('../Models/ingredienteReceta.model');
const { authorize } = require('../helpers/authorize');

const createIngRecipe = async (req, res) => {
  const response = new ServiceResponse();
  const { cantidad, medicion, especificacion, ingrediente_id, receta_id, priority } = req.body;

  try {
    const ingRecipe = await ingredientereceta.create({
      cantidad,
      medicion,
      especificacion,
      ingrediente_id,
      receta_id,
      priority,
    });

    response.setSucessResponse(
      'El ingrediente se asigno correctamente a la receta ',
      ingRecipe
    );
  } catch (error) {
    response.setErrorResponse(error.message, error.code);
  } finally {
    res.send(response);
  }
};

const editIngRecipe = async (req, res) => {
  const response = new ServiceResponse();
  const { cantidad, medicion, especificacion, priority } = req.body;

  const { id } = req.params;

  try {
    const ingRecipe = await ingredientereceta.findByPk(id);
    if (!ingRecipe)
      return response.setErrorResponse('No hay un ingrediente asignado a esta receta');

    await ingredientereceta.update(
      {
        cantidad,
        medicion,
        especificacion,
        priority,
      },
      {
        where: {
          id: id,
        },
      }
    );

    response.setSucessResponse('El ingrediente fue editado con exito ', true);
  } catch (error) {
    response.setErrorResponse(error.message, error.code);
  } finally {
    res.send(response);
  }
};

const getOneIngRecipe = async (req, res) => {
  const response = new ServiceResponse();
  const { id } = req.params;

  try {
    const ingRecipe = await ingredientereceta.findByPk(id);
    if (!ingRecipe)
      return response.setErrorResponse('No hay un ingrediente asignado a esta receta');

    response.setSucessResponse('El Obtenido con exito  ', ingRecipe);
  } catch (error) {
    response.setErrorResponse(error.message, error.code);
  } finally {
    res.send(response);
  }
};

const getIngRecipes = async (req, res) => {
  const response = new ServiceResponse();
  const { id } = req.params;

  try {
    const receta = await RecetaModel.findByPk(id);
    if (!receta) return response.setErrorResponse('La receta no existe', 204);

    const ingRecipe = await ingredientereceta.findAll({
      where: {
        receta_id: id,
      },
      include: [
        { model: RecetaModel, as: 'receta' },
        { model: ingrediente, as: 'ingrediente' },
      ],
    });

    if (!ingRecipe)
      return response.setErrorResponse('No hay un ingrediente asignado a esta receta');

    response.setSucessResponse(
      'Ingrediente(s) asignados a la receta obtenidos con exito  ',
      ingRecipe
    );
  } catch (error) {
    response.setErrorResponse(error.message, error.code);
  } finally {
    res.send(response);
  }
};

const deleteIngRecipes = async (req, res) => {
  const response = new ServiceResponse();
  const { id } = req.params;
  try {
    const receta = await RecetaModel.findByPk(id);
    if (!receta) return response.setErrorResponse('La receta no existe', 204);

    const data = await authorize(req);

    if (!data.success) {
      return response.setErrorResponse(data.message, data.statusCode);
    }

    if (receta.user_id !== data.data) {
      return response.setErrorResponse(
        'No se tienen los permisos para eliminar esta receta',
        403
      );
    }

    const ingRecipe = await ingredientereceta.destroy({
      where: {
        receta_id: id,
      },
    });

    if (!ingRecipe)
      return response.setErrorResponse('No hay un ingrediente asignado a esta receta');

    response.setSucessResponse(
      'Ingrediente(s) asignados a la receta eliminados con exito  ',
      ingRecipe
    );
  } catch (error) {
    response.setErrorResponse(error.message, error.code);
  } finally {
    res.send(response);
  }
};

const deletaIngRecipe = async (req, res) => {
  const response = new ServiceResponse();
  const { id } = req.params;

  try {
    const ingRecipe = await ingredientereceta.findByPk(id);
    if (!ingRecipe)
      return response.setErrorResponse('No hay un ingrediente asignado a esta receta');

    await ingredientereceta.destroy({
      where: {
        id: id,
      },
    });

    response.setSucessResponse('El ingrediente fue eliminado con exito ', true);
  } catch (error) {
    response.setErrorResponse(error.message, error.code);
  } finally {
    res.send(response);
  }
};

module.exports = {
  createIngRecipe,
  editIngRecipe,
  deletaIngRecipe,
  deleteIngRecipes,
  getIngRecipes,
  getOneIngRecipe,
};
