const ServiceResponse = require('../helpers/serviceResponse');
const { authorize } = require('../helpers/authorize');
const { pasosreceta } = require('../Models/pasos.model');
const { RecetaModel } = require('../Models/receta.model');
const createSteps = async (req, res) => {
  const { number, name, description, img, receta_id } = req.body;
  const createStepResponse = new ServiceResponse();
  try {
    const data = await authorize(req);
    if (!data.success)
      return createStepResponse.setErrorResponse(data.message, data.statusCode);

    const receta = await RecetaModel.findByPk(receta_id);
    if (!receta)
      return createStepResponse.setErrorResponse('No existe receta al cual asiganar', 204);

    const steps = await pasosreceta.create({
      number: number,
      name: name,
      description: description,
      img: img,
      receta_id: receta_id,
    });

    createStepResponse.setSucessResponse('Pasos creados exitosamente', steps);
  } catch (error) {
    createStepResponse.setErrorResponse(error.message, 500);
  } finally {
    res.send(createStepResponse);
  }
};

const editSteps = async (req, res) => {
  const { id } = req.params;
  const { number, name, description, img } = req.body;
  const editStepResponse = new ServiceResponse();

  try {
    const data = await authorize(req);

    if (!data.success) return editStepResponse.setErrorResponse(data.message, data.statusCode);

    const step = await pasosreceta.findByPk(id);

    if (!step) {
      return editStepResponse.setErrorResponse('Paso no encontrado', 404);
    }

    step.number = number || step.number;
    step.name = name || step.name;
    step.description = description || step.description;
    step.img = img || step.img;

    await step.save();

    editStepResponse.setSucessResponse('Paso editado exitosamente', step);
  } catch (error) {
    editStepResponse.setErrorResponse(error.message, 500);
  } finally {
    res.send(editStepResponse);
  }
};

const getStepsByRecipeId = async (req, res) => {
  const { id } = req.params;
  const getStepsResponse = new ServiceResponse();
  try {
    if (!id) {
      return getStepsResponse.setErrorResponse('El parámetro receta_id es requerido', 400);
    }

    const receta = await RecetaModel.findByPk(id);
    if (!receta)
      return getStepsResponse.setErrorResponse('No existe receta al cual asignar', 204);

    const steps = await pasosreceta.findAll({
      where: {
        receta_id: id,
      },
      order: [['number', 'ASC']],
    });

    if (steps.length === 0) {
      return getStepsResponse.setErrorResponse(
        'No se encontraron pasos para la receta dada',
        404
      );
    }

    getStepsResponse.setSucessResponse('Pasos obtenidos exitosamente', steps);
  } catch (error) {
    getStepsResponse.setErrorResponse(error.message, 500);
  } finally {
    res.send(getStepsResponse);
  }
};

const deleteSteps = async (req, res) => {
  const { id } = req.params;
  const deleteStepResponse = new ServiceResponse();
  try {
    const steps = await pasosreceta.findByPk(id);
    if (!steps) return deleteStepResponse.setErrorResponse('El paso buscado no existe', 204);
    await pasosreceta.destroy({
      where: {
        id: id,
      },
    });

    deleteStepResponse.setSucessResponse('Paso eliminado correctamente', true);
  } catch (error) {
    deleteStepResponse.setErrorResponse(error.message, 500);
  } finally {
    res.send(deleteStepResponse);
  }
};

const deleteStepsByRecipeId = async (req, res) => {
  const { id } = req.params;
  const deleteStepsResponse = new ServiceResponse();

  try {
    if (!id) {
      return deleteStepsResponse.setErrorResponse('El parámetro receta_id es requerido', 400);
    }

    const receta = await RecetaModel.findByPk(id);
    if (!receta)
      return deleteStepsResponse.setErrorResponse('No existe receta al cual asignar', 204);

    const data = await authorize(req);

    if (!data.success) {
      return deleteStepsResponse.setErrorResponse(data.message, data.statusCode);
    }

    if (receta.user_id !== data.data) {
      return deleteStepsResponse.setErrorResponse(
        'No se tienen los permisos para eliminar esta receta',
        403
      );
    }

    const steps = await pasosreceta.findAll({
      where: {
        receta_id: id,
      },
    });

    if (steps.length === 0) {
      return deleteStepsResponse.setErrorResponse(
        'No se encontraron pasos para la receta dada',
        404
      );
    }

    await pasosreceta.destroy({
      where: {
        receta_id: id,
      },
    });

    console.log('Pasos eliminados correctamente.'); // Registro de depuración

    deleteStepsResponse.setSucessResponse('Todos los pasos han sido eliminados exitosamente');
  } catch (error) {
    deleteStepsResponse.setErrorResponse(error.message, 500);
  } finally {
    res.send(deleteStepsResponse);
  }
};

module.exports = {
  createSteps,
  editSteps,
  getStepsByRecipeId,
  deleteSteps,
  deleteStepsByRecipeId,
};
