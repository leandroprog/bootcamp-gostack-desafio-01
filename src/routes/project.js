const express = require("express");
const routes = express.Router();
const model = require("../model/projects");

routes.use((req, res, next) => {
  console.count("Número de requisições");
  return next();
});

function idNotExist(req, res, next) {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ error: "Parâmetros inválidos" });
  }

  return next();
}

function titleNotExist(req, res, next) {
  const { title } = req.body;
  if (!title) {
    res.status(400).json({ error: "Parâmetros inválidos" });
  }

  return next();
}

routes.get("/projects", (req, res) => {
  res.json(model.getData());
});

routes.post("/projects", (req, res) => {
  const { id, title } = req.body;

  if (!id || !title) {
    res.status(400).json({ error: "Parâmetros inválidos" });
  }

  if (model.findById(id)) {
    res.status(400).json({ error: "Projeto já existente" });
  }

  model.getData().push({ id, title, tasks: [] });
  model.setData(model.getData());

  res.status(201).send();
});

routes.post("/projects/:id/tasks", idNotExist, titleNotExist, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const objProjeto = model.findById(id);

  if (objProjeto) {
    objProjeto.tasks.push(title);
    model.setData(model.getData());
    res.status(201).send();
  }

  res.status(400).json({ error: "Parâmetros inválidos" });
});

routes.put("/projects/:id", idNotExist, titleNotExist, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const objProjeto = model.findById(id);
  if (objProjeto) {
    objProjeto.title = title;
    model.setData(model.getData());

    res.status(200).send();
  }

  res.status(400).json({ error: "Parâmetros inválidos" });
});

routes.delete("/projects/:id", idNotExist, (req, res) => {
  const { id } = req.params;

  const objProjeto = model.findById(id);

  if (objProjeto) {
    model.deleteById(id);
    res.status(200).send();
  }

  res.status(400).json({ error: "Parâmetros inválidos" });
});

module.exports = routes;
