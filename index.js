const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
   .then(console.log('Conected to mongoDB', process.env.MONGO_URL))
   .catch((err) => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.listen("5000", () => {
   console.log('Server on port:', 5000);
});