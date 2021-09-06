const express = require('express')
const router = express.Router()

const Projects = require('./projects-model')

const { checkProjectId, checkProjectBody } = require('./projects-middleware')

router.get('/', (req, res, next) => {
    Projects.get()
        .then(projectList => 
            res.status(200).json(projectList))
        .catch(next)
})

router.get('/:id',checkProjectId , (req, res) => {
    res.status(200).json(req.project)
})


router.post('/', checkProjectBody, (req, res, next) => {
    console.log('working on posting a project')
    Projects.insert(req.body)
        .then(newProject => {
            return newProject
        })
        .then(newProject => {
            res.status(200).json(newProject)
        })
        .catch(next)
})

router.put('/:id', checkProjectId, checkProjectBody, (req, res, next) => {
    console.log('req.body.completed', req.body.completed)
    if(req.body.completed === undefined){
        res.status(400).json({ message: "missing completed field"})
    }else{
        Projects.update(req.params.id, req.body)
            .then(updatedProject => {
                return updatedProject
            })
            .then(resp => {
                console.log('resp', resp)
                res.status(200).json({ 
                    completed: resp.completed,
                    description: resp.description,
                    name: resp.name
                })
            })
            .catch(next)
        }
})

router.delete('/:id', checkProjectId, (req, res, next) => {
    Projects.remove(req.params.id)
        .then(() => {
            res.status(200).json()
        })
        .catch(next)
})

router.get('/:id/actions', checkProjectId, (req, res, next) => {
    Projects.getProjectActions(req.params.id)
        .then(actions => {
            console.log('actions', actions)
            res.status(200).json(actions)
        })
        .catch(next)
})






module.exports = router