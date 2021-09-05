const express = require('express')
const router = express.Router()

const Projects = require('./projects-model')

const { checkProjectId, checkProjectBody } = require('./projects-middleware')

router.get('/', (req, res) => {
    Projects.get()
        .then(projectList => 
            res.status(200).json(projectList))
        .catch(err => console.log(err.message))
})

router.get('/:id',checkProjectId , (req, res, next) => {
    res.status(200).json(req.project)
})


router.post('/', checkProjectBody, (req, res) => {
    console.log('working on posting a project')
    Projects.insert(req.body)
        .then(newProject => {
            return newProject
        })
        .then(newProject => {
            res.status(200).json(newProject)
        })
        .catch(err => res.status(500).json({ message: err.message}))
})

router.put('/:id', checkProjectId, checkProjectBody, (req, res) => {
    if(!req.body.completed){
        res.status(400).json({ message: "missing completed field"})
    }

    const changes = {
        ...req.body,
        id: req.params.id
    }

    Projects.update(req.params.id, changes)
        .then(updatedProject => {
            return updatedProject
        })
        .then(resp => {
            console.log('resp', resp)
            res.status(200).json(resp)
        })
        .catch(err => console.log(err.message))
})

router.delete('/:id', checkProjectId, (req, res) => {
    Projects.remove(req.params.id)
        .then(() => {
            res.status(200).json()
        })
        .catch(err => res.status(500).json({ message: err.message}))
})

router.get('/:id/actions', checkProjectId, (req, res) => {
    Projects.getProjectActions(req.params.id)
        .then(actions => {
            console.log('actions', actions)
            res.status(200).json(actions)
        })
        .catch(err => res.status(500).json({ message: err.message}))
})




module.exports = router