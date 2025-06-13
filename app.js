const express = require("express");
const app = express();
const port = 3000;
const routerPosts = require("./routers/posts");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");

app.listen(port, () => {
  console.log("Server collgato alla port:" + port);
});

app.get("/", (req, res) => {
  res.json("Server del mio blog");
});

// Middlewares
app.use(express.static("public"));
app.use(express.json());

// Routes
app.use("/bacheca", routerPosts);

// Errors middlewares
app.use(errorHandler);
app.use(notFound);
