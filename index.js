const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const auth = require('./routes/auth');
dotenv.config();

//middleware
app.use(express.json());
app.use(cors());

app.use('/auth', auth);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
