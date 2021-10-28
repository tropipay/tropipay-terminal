const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const PORT = process.env.PORT || 3005;

app.use(cors());
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use('/api/v1/security', require('./security/route'));
app.use('/api/v1/movement', require('./movement/route'));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});