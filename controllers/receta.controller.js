const ServiceResponse = require("../helpers/serviceResponse");
const { authorize } = require("../helpers/authorize");
const moment = require("moment");

const RecetaModel = require("../Models/receta.model");

const createRecipe = async (req, res) => {
  const { description, img, name, dificultad, time, porcion, date } = req.body;
  const createRecipeResponse = new ServiceResponse();

  try {
    const data = await authorize(req);

    if (!data.success)
      return createRecipeResponse.setErrorResponse(
        data.message,
        data.statusCode
      );
    const id_user = data.data;

    const parsedDate = moment(date, "DD/MM/YYYY", true);

    if (!parsedDate.isValid()) {
      return createRecipeResponse.setErrorResponse("Fecha inválida", 400);
    }
    const newRecipe = await RecetaModel.create({
      description,
      img,
      name,
      dificultad,
      time,
      porcion,
      date: parsedDate.toDate(), // Convertir a objeto Date
      user_id: id_user,
    });

    createRecipeResponse.setSucessResponse(
      "Receta creada exitosamente",
      newRecipe
    );
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const validationErrors = error.errors.map((err) => ({
        message: err.message,
        field: err.path,
      }));
      // const errorMessage = validationErrors
      //   .map((error) => error.message)
      //   .join("; ");ks

      createRecipeResponse.setErrorResponse(validationErrors, 404);
    }

    createRecipeResponse.setErrorResponse(error.message, 500);
  } finally {
    res.send(createRecipeResponse);
  }
};

const editRecipe = async (req, res = response) => {
  const { id } = req.params; // Obtener el ID de la receta a editar
  const { description, img, name, dificultad, time, porcion, date } = req.body;
  const editRecipeResponse = new ServiceResponse();

  try {
    const data = await authorize(req);

    if (!data.success)
      return editRecipeResponse.setErrorResponse(data.message, data.statusCode);
    const id_user = data.data;

    const parsedDate = await moment(date, "DD/MM/YYYY", true);

    if (!parsedDate.isValid()) {
      return editRecipeResponse.setErrorResponse("Fecha inválida", 400);
    }

    const fk = await RecetaModel.findByPk(id);
    if (fk.user_id != id_user) {
      return editRecipeResponse.setErrorResponse(
        "No se tienen los permisos para editar esta receta",
        403
      );
    }
    // Buscar la receta por su ID
    const receta = await RecetaModel.findByPk(id);

    // Verificar si la receta existe
    if (!receta) {
      editRecipeResponse.setErrorResponse("Receta no encontrada", 404);
    }

    // Actualizar los campos de la receta
    receta.description = description;
    receta.img = img;
    receta.name = name;
    receta.dificultad = dificultad;
    receta.time = time;
    receta.porcion = porcion;
    receta.date = parsedDate;

    // Guardar los cambios en la base de datos
    await receta.save();

    editRecipeResponse.setErrorResponse("Receta editada con éxito", receta);
  } catch (error) {
    editRecipeResponse.setErrorResponse(error.message, 500);
  } finally {
    res.send(editRecipeResponse);
  }
};

const getall = async (req, res = response) => {
  const response = new ServiceResponse();
  try {
    const users = await RecetaModel.findAll();

    response.setSucessResponse("Las recetas se obtuvieron con éxito", users);
  } catch (error) {
    return response.setErrorResponse(error.message, error.code);
  } finally {
    res.send(response);
  }
};

const deleteRecipe = async (req, res = response) => {
  const { id } = req.params; // Obtener el ID de la receta a eliminar
  const deleteRecipeResponse = new ServiceResponse();

  try {
    const data = await authorize(req);

    if (!data.success) {
      console.log("Authorization failed:", data.message);
      deleteRecipeResponse.setErrorResponse(data.message, data.statusCode);
      return res.send(deleteRecipeResponse); // Enviar respuesta y finalizar
    }

    const id_user = data.data;

    // Buscar la receta por su ID
    const receta = await RecetaModel.findByPk(id);

    // Verificar si la receta existe
    if (!receta) {
      console.log("Recipe not found:", id);
      deleteRecipeResponse.setErrorResponse("Receta no encontrada", 404);
      return res.send(deleteRecipeResponse); // Enviar respuesta y finalizar
    }

    // Verificar si el usuario tiene permisos para eliminar la receta
    if (receta.user_id !== id_user) {
      console.log(
        "User does not have permission to delete the recipe:",
        id_user
      );
      deleteRecipeResponse.setErrorResponse(
        "No se tienen los permisos para eliminar esta receta",
        403
      );
      return res.send(deleteRecipeResponse); // Enviar respuesta y finalizar
    }

    // Eliminar la receta de la base de datos
    await receta.destroy();
    console.log("Recipe deleted:", id);

    deleteRecipeResponse.setSucessResponse("Receta eliminada con éxito");
    return res.send(deleteRecipeResponse); // Enviar respuesta y finalizar
  } catch (error) {
    console.error("Error al eliminar receta:", error);
    deleteRecipeResponse.setErrorResponse("Error al eliminar receta", 500);
    return res.send(deleteRecipeResponse); // Enviar respuesta y finalizar
  }
};

module.exports = { createRecipe, editRecipe, getall, deleteRecipe };
