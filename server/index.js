const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Users = require('./models/Users');
const cors = require('cors');
const userRoutes = require('./routes/user-routes');

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://admin:admin@mern2023.ydheb04.mongodb.net/myfirstdatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Database connected"))
    .catch((e) => console.log(e));

app.use('/', userRoutes);

const port = 3001;

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
})