const { ingrediente } = require("../Models/ingrediente.model");
const ServiceResponse = require("../helpers/serviceResponse");
const { Op, Sequelize } = require("sequelize");

const createIngrediente = async (req, res) => {
  const { name, category, img } = req.body;
  const response = new ServiceResponse();
  try {
    const ing = await ingrediente.findOne({
      where: {
        name: name,
      },
    });

    if (ing)
      return response.setErrorResponse(
        "Ya existe un ingrediente con este nombre",
        204
      );

    const respuesta = await ingrediente.create({
      name: name,
      category: category,
      img: img,
    });
    response.setSucessResponse(
      "Ingrediente registrado exitosamente",
      respuesta
    );
  } catch (error) {
    response.setErrorResponse(error.message, error.code);
  } finally {
    res.send(response);
  }
};

const getall = async (req, res) => {
  const response = new ServiceResponse();
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  const category = req.query.category;
  const options = {
    attributes: { exclude: ["createdAt", "updatedAt"] },
  };

  if (category) options.where = { category: category };
  if (limit !== undefined) options.limit = limit;

  try {
    const Ingredientes = await ingrediente.findAll(options);

    if (!Ingredientes)
      response.setErrorResponse("No Existen ingredientes", 204);
    response.setSucessResponse("Ingrediente(s) encontrados", Ingredientes);
  } catch (error) {
    response.setErrorResponse(error.message, error.code);
  } finally {
    res.send(response);
  }
};

const getone = async (req, res) => {
  const ingredienteId = req.params.id;
  const response = new ServiceResponse();

  try {
    const Ingredientes = await ingrediente.findByPk(ingredienteId);

    if (!Ingredientes)
      response.setErrorResponse("No Existe el ingrediente", 204);
    response.setSucessResponse("Ingrediente encontrado", Ingredientes);
  } catch (error) {
    response.setErrorResponse(error.message, error.code);
  } finally {
    res.send(response);
  }
};

const getByName = async (req, res) => {
  const ingredienteName = req.params.name;
  const response = new ServiceResponse();

  try {
    const Ingrediente = await ingrediente.findOne({
      where: { name: { [Op.iLike]: `%${ingredienteName}%` } },
    });

    if (!Ingrediente) {
      response.setErrorResponse("Ingrediente no encontrado", 204);
    } else {
      response.setSucessResponse("Ingrediente encontrado", Ingrediente);
    }
  } catch (error) {
    response.setErrorResponse(error.message, error.code || 500);
  } finally {
    res.send(response);
  }
};

const editIngrediente = async (req, res) => {
  const { id, name, category, img } = req.body;
  const response = new ServiceResponse();
  try {
    const Ingredientes = await ingrediente.findByPk(id);
    if (!Ingredientes)
      return response.setErrorResponse("No existe el ingrediente", 204);

    await ingrediente.update(
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

    response.setSucessResponse("Ingrediente editado con exito", true);
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
    const Ingredientes = await ingrediente.findByPk(id);
    if (!Ingredientes)
      return response.setErrorResponse("No existe el ingrediente", 204);

    await ingrediente.destroy({
      where: {
        id: id,
      },
      order: [
        ["category", "ASC"], // Ordena por el campo "number" de manera ascendente (ASC)
      ],
    });
    response.setSucessResponse("Ingrediente eliminado con exito", true);
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
  getByName,
};
