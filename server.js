const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');

const buildPath = path.resolve(__dirname, 'build/');

const app = express();

app.use(favicon(`${buildPath}/favicon.ico`));
app.use(express.static(buildPath));

app.get('*', (req, res) => {
  res.status(404).end('404: Not Found');
});

app.use((error, req, res) => {
  console.error(error);
  res.status(500).end('500: Internal Server Error');
});

app.listen(3000, () => {
  console.log('The server is running at http://localhost:3000/');
});
