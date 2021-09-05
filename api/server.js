const cors = require('cors')
const express = require('express');
const server = express();
const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');

server.use(express.json());
server.use(cors())
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
    res.status(200).json({ message: "Hello you"})
})

//handle wrong routes
server.get('*', (req, res) => {
    res.status(404).json({ message: "not found"})
})


// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js


module.exports = server;
