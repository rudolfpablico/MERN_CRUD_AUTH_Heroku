const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");

const items = require("./routes/api/items");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");

const app = express();

//BodyParser Middleware
app.use(express.json());

//DB config
const db = config.get("mongoURI");

//Connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connected."))
  .catch((err) => console.log(err));

//Use Routes
app.use("/api/items", items);
app.use("/api/users", users);
app.use("/api/auth", auth);

//Serve build file from client if production
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

//Setup Port
const port = process.env.PORT || 5000;

//Listen to port
app.listen(port, () => console.log(`Server connected on port ${port}`));
