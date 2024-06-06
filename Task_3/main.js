const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const articleRoutes = require('./articleRoutes.js')
const Article = require('./articleSchema.js');
const methodOverride = require('method-override');

const app = express();
app.use(bodyParser.json());

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }))
app.use('/', articleRoutes)

mongoose.
connect(
    'mongodb+srv://gauransaini:NfBamM5Yb3uIWleU@exun-task-3-round-3.nuncrnl.mongodb.net/?retryWrites=true&w=majority&appName=exun-task-3-round-3'
)
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
}).catch((error) => {
    console.log(error)
})
