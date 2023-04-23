require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');
const {
  PORT,
  MONGO_DB_URI,
  SESSION_KEY
} = process.env;

const app = express();

// connect to db
mongoose.connect(MONGO_DB_URI, (err) => {
  if(err) {
    console.log(err);
    return;
  }

  console.log(`Connect to database!`);
})
// parsing the body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// to allow cross-origin requests
app.use(cors());
app.use(session({
  secret: SESSION_KEY,
  resave: false,
  // to prevent creating an empty session objects...
  saveUninitialized: false,
  cookie: { httpOnly: true }
}));
app.use(express.static('./public'));
app.use('/', require('./routes/views'));
// routes
app.use('/', require('./routes/api'));

app.listen(PORT, () => {
  console.log(`The web service is running at ${PORT}...`);
});