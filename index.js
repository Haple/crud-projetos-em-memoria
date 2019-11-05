const express = require("express");

const server = express();

server.use(express.json());

let countRequest = 0;
const projects = [];

server.use((req, res, next) => {
  console.log(`Number of requests: ${++countRequest}`);
  next();
});

function findProject(req, res, next) {
  const { id } = req.params;
  const project = projects.find(project => project.id == id);
  if (!project)
    return res.status(404).json({ error: "Project not found" });
  req.project = project;
  next();
}

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

server.put("/projects/:id", findProject, (req, res) => {
  const { title } = req.body;
  req.project.title = title;
  return res.json(req.project);
});

server.delete("/projects/:id", findProject, (req, res) => {
  projects.splice(projects.indexOf(req.project), 1);
  return res.json();
});

server.post("/projects/:id/tasks", findProject, (req, res) => {
  const { title } = req.body;
  req.project.tasks.push(title);
  return res.json(req.project);
});

server.listen(3000);