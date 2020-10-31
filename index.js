require('dotenv').config();
const express = require('express');
const { sendMessage } = require('./sendMessage');

const app = express();
const port = 3000;

sendMessage('01057584889', '58291');

// const response = Axios.get('http://localhost:4000/playground').then((res) => console.log(res));

// app.get('/', (req, res) => {
//   res.send('Hello KMSEO!');
// });

// app.listen(port, () => {
//   console.log(`app is running at http://localhost:${port}`);
// });
