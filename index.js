const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const auth = require("./routes/auth.route");
const ingrediente = require("./routes/ingrediente.route");
const ingredienteReceta = require("./routes/ingredienteReceta.route");
const pasos = require("./routes/pasos.route");
const receta = require("./routes/receta.route");
const recetaGuardadas = require("./routes/recetaGuardadas.route");
const { asociacionesModels } = require("./Models/index");
dotenv.config();

//middleware
app.use(express.json());
app.use(cors());
asociacionesModels();
app.use("/auth", auth);
app.use("/ingrediente", ingrediente);
app.use("/ingredienteReceta", ingredienteReceta);
app.use("/pasos", pasos);
app.use("/receta", receta);
app.use("/recetaGuardadas", recetaGuardadas);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
