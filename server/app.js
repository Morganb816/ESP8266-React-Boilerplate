const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const port = 8080;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../public'));
});

app.listen(port, console.log(`

   ----Listening on port ${port}---
   --- http://localhost:${port} ---

`));
