const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const auth = require('./routes/auth.route');
const ingrediente = require('./routes/ingrediente.route');
const ingredienteReceta = require('./routes/ingredienteReceta.route');
const pasos = require('./routes/pasos.route');
const receta = require('./routes/receta.route');
const recetaGuardadas = require('./routes/recetaGuardadas.route');
const recetaUsuario = require('./routes/recetaUsuario.route');

dotenv.config();

//middleware
app.use(express.json());
app.use(cors());

app.use('/auth', auth);
app.use('/ingrediente', ingrediente);
app.use('/ingredienteReceta', ingredienteReceta);
app.use('/pasos', pasos);
app.use('/receta', receta);
app.use('/recetaGuardadas', recetaGuardadas);
app.use('/recetaUsuario', recetaUsuario);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
