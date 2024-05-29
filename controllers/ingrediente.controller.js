const { ingrediente } = require('../Models/ingrediente.model');
const ServiceResponse = require('../helpers/serviceResponse');
// const { Op } = require('sequelize');

const createIngrediente = async (req, res) => {
  const { name, category, img } = req.body;
  const response = new ServiceResponse();
  try {
    const respuesta = await ingrediente.create({
      name: name,
      category: category,
      img: img,
    });
    response.setSucessResponse('Ingrediente registrado exitosamente', respuesta);
  } catch (error) {
    response.setErrorResponse(error.message, error.code);
    // if (error.message === 'Validation error') {
    //   response.setErrorResponse('Ya existe un ingrediente con ese nombre', error.code);
    // }
  } finally {
    res.send(response);
  }
};

const getall = async (req, res) => {
  const response = new ServiceResponse();
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  const category = req.query.category;
  const options = {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  };

  if (category) options.where = { category: category };
  if (limit !== undefined) options.limit = limit;

  try {
    const Ingredientes = await ingrediente.findAll(options);
    Ingredientes !== null
      ? response.setSucessResponse('Ingrediente(s) encontrados', Ingredientes)
      : response.setErrorResponse('No Existen ingredientes', 204);
  } catch (error) {
    response.setErrorResponse(error.message, error.code);
  } finally {
    res.send(response);
  }
};

const getone = async (req, res) => {
  const userId = req.params.id;
  const response = new ServiceResponse();

  try {
    const Ingredientes = await ingrediente.findByPk(userId, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    Ingredientes !== null
      ? response.setSucessResponse('Ingrediente(s) encontrados', Ingredientes)
      : response.setErrorResponse('No Existen ingredientes', 204);
  } catch (error) {
    response.setErrorResponse(error.message, error.code);
  } finally {
    res.send(response);
  }
};

const editIngrediente = async (req, res) => {
  const { id, name, category, img } = req.body;
  const response = new ServiceResponse();
  try {
    const respuesta = await ingrediente.update(
      {
        name: name,
        category: category,
        img: img,
      },
      {
        where: {
          id: id,
        },
      }
    );
    parseInt(respuesta) === 1
      ? response.setSucessResponse('Ingrediente editado con exito', true)
      : response.setErrorResponse('No Existe el ingrediente', 204);
  } catch (error) {
    response.setErrorResponse(error.message, error.code);
  } finally {
    res.send(response);
  }
};

const deleteIngrediente = async (req, res) => {
  const { id } = req.body;

  const response = new ServiceResponse();
  try {
    const respuesta = await ingrediente.destroy({
      where: {
        id: id,
      },
    });
    parseInt(respuesta) === 1
      ? response.setSucessResponse('Ingrediente eliminado con exito', true)
      : response.setErrorResponse('No Existe el ingrediente', 204);
  } catch (error) {
    response.setErrorResponse(error.message, error.code);
  } finally {
    res.send(response);
  }
};

module.exports = {
  createIngrediente,
  getall,
  getone,
  editIngrediente,
  deleteIngrediente,
};
