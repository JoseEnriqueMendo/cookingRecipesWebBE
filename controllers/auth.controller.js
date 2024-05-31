const { hashPassword } = require('../helpers/encryption');
const { User } = require('../Models/User.model');
const jwtGenerator = require('../helpers/jwtGenerator');
const bcrypt = require('bcryptjs');
const { authorize } = require('../helpers/authorize');
const ServiceResponse = require('../helpers/serviceResponse');

const login = async (req, res) => {
  const { email, password } = req.body;
  const response = new ServiceResponse();
  try {
    const users = await User.findOne(
      {
        where: {
          email: email,
        },
      },
      {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      }
    );

    if (users === null)
      return response.setErrorResponse('No Existe un usuario con ese correo', 204);

    const validPassword = await bcrypt.compare(password, users.password);

    if (!validPassword) {
      response.setErrorResponse('Contraseña no erronea', 401);
      return response;
    }

    const token = jwtGenerator(users.id);

    response.setSucessResponse('Se inició sesión exitosamente', {
      token: token,
    });
  } catch (error) {
    response.setErrorResponse(error.message, error.code);
  } finally {
    res.send(response);
  }
};

const createUser = async (req, res) => {
  const { name, surname, email, password, phone, image } = req.body;
  const response = new ServiceResponse();

  try {
    const users = await User.findOne({
      where: {
        email: email,
      },
    });

    if (users) return response.setErrorResponse('Ya existe un usuario para ese correo', 204);

    const hashedPassword = await hashPassword(password);
    const respuesta = await User.create({
      name: name,
      surname: surname,
      email: email,
      phone: phone,
      password: hashedPassword,
      image: image,
    });

    response.setSucessResponse('Usuario registrado exitosamente', respuesta);
  } catch (error) {
    response.setErrorResponse(error.message, error.code);
  } finally {
    res.send(response);
  }
};

const getall = async (req, res) => {
  const response = new ServiceResponse();
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });

    if (!users) response.setErrorResponse('No Existen usuarios', 204);
    response.setSucessResponse('Usuario(s) encontrados', users);
  } catch (error) {
    response.setErrorResponse(error.message, error.code);
  } finally {
    res.send(response);
  }
};

const getThis = async (req, res) => {
  const response = new ServiceResponse();
  try {
    const data = await authorize(req);
    if (!data.success) return response.setErrorResponse(data.message, data.statusCode);
    const id_user = data.data;

    const users = await User.findByPk(id_user, {
      attributes: { exclude: ['password'] },
    });

    if (!users) response.setErrorResponse('No Existe el usuario', 204);
    response.setSucessResponse('Usuario encontrados', users);
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
    const users = await User.findByPk(userId, {
      attributes: { exclude: ['password'] },
    });

    if (!users) response.setErrorResponse('No Existe el usuario', 204);
    response.setSucessResponse('Usuario encontrado', users);
  } catch (error) {
    response.setErrorResponse(error.message, error.code);
  } finally {
    res.send(response);
  }
};

const updateUser = async (req, res) => {
  const { name, surname, phone } = req.body;
  const response = new ServiceResponse();
  try {
    const data = await authorize(req);
    if (!data.success) return response.setErrorResponse(data.message, data.statusCode);
    const id_user = data.data;

    const users = await User.findByPk(id_user);

    if (!users) return response.setErrorResponse('No Existe el usuario', 204);

    const respuesta = await User.update(
      {
        name: name,
        surname: surname,
        phone: phone,
      },
      {
        where: {
          id: id_user,
        },
      }
    );

    response.setSucessResponse('Usuario editado con exito', respuesta);
  } catch (error) {
    response.setErrorResponse(error.message, error.code);
  } finally {
    res.send(response);
  }
};

const deleteUser = async (req, res) => {
  const response = new ServiceResponse();
  try {
    const data = await authorize(req);
    if (!data.success) return response.setErrorResponse(data.message, data.statusCode);
    const id_user = data.data;

    const users = await User.findByPk(id_user);

    if (!users) return response.setErrorResponse('No Existe el usuario', 204);

    const respuesta = await User.destroy({
      where: {
        id: id_user,
      },
    });

    response.setSucessResponse('Usuario eliminado con exito', respuesta);
  } catch (error) {
    response.setErrorResponse(error.message, error.code);
  } finally {
    res.send(response);
  }
};

const verifyToken = async (req, res) => {
  const response = new ServiceResponse();
  try {
    const data = await authorize(req);
    if (!data.success) {
      return response.setErrorResponse(data.message, data.statusCode);
    }
    response.setSucessResponse('Token validado', true);
  } catch (error) {
    response.setErrorResponse(error.message, error.code);
  } finally {
    res.send(response);
  }
};

module.exports = {
  login,
  verifyToken,
  createUser,
  getall,
  getone,
  getThis,
  deleteUser,
  updateUser,
};
