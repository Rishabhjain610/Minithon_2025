const express = require('express');
const cors = require('cors');
require('dotenv').config();
const ConnectDB = require('./Db/Db');
const cookieParser = require('cookie-parser');
const AuthRouter = require('./routes/auth.routes');
ConnectDB();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors(
  {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }
));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', AuthRouter);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
