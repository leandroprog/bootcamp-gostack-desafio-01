const express = require("express");
const server = express();
const routesProjects = require("./src/routes/project");

server.use(express.json());

server.use(routesProjects);

server.listen(3000, () => {
  console.log("Funfando");
});
