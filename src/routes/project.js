const express = require("express");
const routes = express.Router();
const model = require("../model/projects");

routes.use((req, res, next) => {
  console.count("Número de requisições");
  return next();
});

function projectExists(req, res, next) {
  const { id } = req.params;

  if (!model.findById(id))
    return res.status(400).json({ error: "Projeto não existe" });

  return next();
}

function titleNotExist(req, res, next) {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Parâmetros inválidos" });
  }

  return next();
}

routes.get("/projects", (req, res) => {
  res.json(model.getData());
});

routes.post("/projects", titleNotExist, (req, res) => {
  const { id, title } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Parâmetros inválidos" });
  }

  if (model.findById(id)) {
    return res.status(400).json({ error: "Projeto já existente" });
  }
  model.getData().push({ id, title, tasks: [] });
  model.setData(model.getData());

  return res.status(201).send();
});

routes.post("/projects/:id/tasks", titleNotExist, projectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  model.findById(id).tasks.push(title);
  model.setData(model.getData());
  return res.status(201).send();
});

routes.put(
  "/projects/:id",

  titleNotExist,
  projectExists,
  (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    model.findById(id).title = title;
    model.setData(model.getData());

    return res.status(200).send();
  }
);

routes.delete("/projects/:id", projectExists, (req, res) => {
  const { id } = req.params;
  model.deleteById(id);
  return res.status(200).send();
});

module.exports = routes;
