const express = require('express');
const serverless = require('serverless-http');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

// Middleware
app.use(express.static(path.join(__dirname, '../dist'))); // Set static folder
app.use('/.netlify/functions/server', router); // Set route end point
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
); // Body parser
app.use(bodyParser.json());

// Routes
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../dist/index.html'));
// });
router.get('/', (req, res) => {
  res.send('GET request to the Serverless App homepage');
});
router.get('/json', (req, res) => {
  res.json({ data: 'Hello World' });
});
router.get('/index', (req, res) => {
  res.render('index.html', { form: 'login form' });
});
router.post('/submit', (req, res) => {
  if (req.body) {
    const { username, password } = req.body;
    console.log(username, password);
  } else {
    console.log('error');
  }
  // console.log('submiting...', { username: username, password: password });
  // res.send('login');
  res.render('index.html', { form: 'login form' });
});

// In order to alow lambda to run - exporting handler function
module.exports = app;
module.exports.handler = serverless(app);

// Express app port No
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));
