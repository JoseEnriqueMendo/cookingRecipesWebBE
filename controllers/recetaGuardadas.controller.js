const { recetasGuardadas } = require('../Models/recetasGuardadas.model');
const ServiceResponse = require('../helpers/serviceResponse');
const { authorize } = require('../helpers/authorize');
const { RecetaModel } = require('../Models/receta.model');
const { User } = require('../Models/User.model');

const getRecetasGuardadasUser = async (req, res) => {
  const response = new ServiceResponse();
  try {
    const data = await authorize(req);
    if (!data.success) return response.setErrorResponse(data.message, data.statusCode);

    const id_user = data.data;

    const respuesta = await recetasGuardadas.findAll({
      where: { user_id: id_user },
      include: [
        { model: RecetaModel, as: 'receta' },
        { model: User, as: 'User', attributes: { exclude: ['password'] } },
      ],
    });

    if (!respuesta)
      return response.setErrorResponse('El usuario no tiene ninguna receta guardada');

    response.setSucessResponse(
      'Recetas Encontradas a la lista del usuario exitosamente',
      respuesta
    );
  } catch (error) {
    response.setErrorResponse(error.message, error.code);
  } finally {
    res.send(response);
  }
};

const createRecetasGuardadas = async (req, res) => {
  const { receta_id } = req.body;
  const response = new ServiceResponse();

  try {
    const receta = await RecetaModel.findByPk(receta_id);
    if (!receta) return response.setErrorResponse('Receta no encontrada', 204);

    const data = await authorize(req);
    if (!data.success) return response.setErrorResponse(data.message, data.statusCode);

    const id_user = data.data;

    const respuestaReceta = await recetasGuardadas.findAll({
      where: {
        user_id: id_user,
        receta_id: receta_id,
      },
    });

    if (respuestaReceta.length !== 0)
      return response.setErrorResponse('El usuario ya tiene guardada esa receta');

    const respuesta = await recetasGuardadas.create({
      receta_id: receta_id,
      user_id: id_user,
    });

    response.setSucessResponse(
      'Receta asignada a la lista del usuario exitosamente',
      respuesta
    );
  } catch (error) {
    response.setErrorResponse(error.message, error.code);
  } finally {
    res.send(response);
  }
};

const deleteRecetasGuardadas = async (req, res) => {
  const { id } = req.params;
  const response = new ServiceResponse();

  try {
    const data = await authorize(req);

    if (!data.success) return response.setErrorResponse(data.message, data.statusCode);

    const id_user = data.data;

    const recetaGuardada = await recetasGuardadas.findOne({
      where: {
        user_id: id_user,
        receta_id: id,
      },
    });

    if (!recetaGuardada) return response.setErrorResponse('Receta  guardada no existe', 204);

    if (id_user !== recetaGuardada.user_id)
      return response.setErrorResponse('No cuenta con los permisos para borrarlo', 204);

    await recetasGuardadas.destroy({
      where: {
        user_id: id_user,
        receta_id: id,
      },
    });

    response.setSucessResponse(
      'Receta desasignada de la lista del usuario exitosamente',
      true
    );
  } catch (error) {
    response.setErrorResponse(error.message, error.code);
  } finally {
    res.send(response);
  }
};

const deleteRecetasGuardadasByRecipe = async (req, res) => {
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

    const resRecipeSave = await recetasGuardadas.destroy({
      where: {
        receta_id: id,
      },
    });

    if (!resRecipeSave)
      return response.setErrorResponse('No hay recetas guardadas para ningun usuario');

    response.setSucessResponse(
      'Recetas guardadas eliminados de todos los usuarios  ',
      resRecipeSave
    );
  } catch (error) {
    response.setErrorResponse(error.message, error.code);
  } finally {
    res.send(response);
  }
};

module.exports = {
  createRecetasGuardadas,
  deleteRecetasGuardadas,
  getRecetasGuardadasUser,
  deleteRecetasGuardadasByRecipe,
};
