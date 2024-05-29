const jwt = require('jsonwebtoken');
require('dotenv').config();
const ServiceResponse = require('../helpers/serviceResponse');

const authorize = async (req) => {
  const response = new ServiceResponse();
  const token = req.header('token');

  if (!token) {
    return response.setErrorResponse('Token no encontrado', 403);
  }

  try {
    const verify = jwt.verify(token, process.env.jwtSecret);
    response.setSucessResponse('Token authorizado', verify.data);
  } catch (err) {
    response.setErrorResponse('Token no es valido', 401);
  } finally {
    return response;
  }
};
module.exports = { authorize };
