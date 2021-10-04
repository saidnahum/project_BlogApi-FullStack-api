const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const categoryRoute = require('./routes/categories');
const multer = require('multer');

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
   .then(console.log('Conected to mongoDB', process.env.MONGO_URL))
   .catch((err) => console.log(err));

// Subir archivo
   const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, "images");
   },
   filename: (req, file, cb) => {
      cb(null, req.body.name)
   }
});

const upload = multer({ storage: storage });
app.post('/api/upload', upload.single("file"), (req, res) => {
   res.status(200).json("File has been uploaded");
})

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categoies", categoryRoute);

app.listen("5000", () => {
   console.log('Server on port:', 5000);
});