const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000

app.get('*', 
    (_, res) => res.sendFile(path.join(__dirname, '/views/index.html')));

console.info(`Server is listening on port ${PORT}`);

app.listen(PORT);