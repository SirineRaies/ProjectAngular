const express = require("express");
const database = require("./src/Database/Database.js");
const path = require("path");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.json());
database.mongoose
  .connect(process.env.DATABASE_URL, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use('/uploads', express.static(path.join(__dirname, 'Uploads')));
require("./src/Routes/Route.js")(app);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port ", process.env.PORT);
});
