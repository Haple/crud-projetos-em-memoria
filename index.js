const express = require("express");

const server = express();

server.use(express.json());

const projects = [];

server.post("/projects", (req, res) => {
  const { id, title } = req.body;
  const project = {
    id, title, tasks: []
  };
  projects.push(project);
  return res.json(project);
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.put("/projects/:id", (req, res) => {
  return res.json("Não fiz ainda");
});

server.delete("/projects/:id", (req, res) => {
  return res.json("Não fiz ainda");
});

server.post("/projects/:id/tasks", (req, res) => {
  return res.json("Não fiz ainda");
});

server.listen(3000);