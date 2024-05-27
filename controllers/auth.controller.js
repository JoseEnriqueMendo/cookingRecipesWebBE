const { response } = require('express');
const { hashPassword } = require('../helpers/encryption');
const { User } = require('../Models/User');

const ServiceResponse = require('../helpers/serviceResponse');

const createUser = async (req, res = response) => {
  const { name, surname, email, password, phone } = req.body;
  const response = new ServiceResponse();

  try {
    const hashedPassword = await hashPassword(password);

    const respuesta = await User.create({
      name: name,
      surname: surname,
      email: email,
      phone: phone,
      password: hashedPassword,
    });

    response.setSucessResponse('Usuario registrado exitosamente', respuesta);
  } catch (error) {
    response.setErrorResponse(error.message, error.code);
  } finally {
    res.send(response);
  }
};

const getall = async (req, res = response) => {
  const response = new ServiceResponse();
  try {
    const users = await User.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }, // Excluye el atributo 'createdAt'
    });

    response.setSucessResponse('Obtnidos usuario(S) con exito', users);
  } catch (error) {
    response.setErrorResponse(error.message, error.code);
  } finally {
    res.send(response);
  }
};

module.exports = {
  createUser,
  getall,
};
