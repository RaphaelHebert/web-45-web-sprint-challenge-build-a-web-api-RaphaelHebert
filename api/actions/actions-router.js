const Actions = require('./actions-model')
const express = require('express')

const router = express.Router()

const { checkActionID, checkActionBody } = require('./actions-middlware')

router.get('/', (req, res) => {
    Actions.get()
        .then( actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            res.status(500).json({ message: "internal server error"})
        })
})


router.get('/:id',checkActionID,  (req, res) => {
    res.status(200).json(req.actions)
})


router.post('/',checkActionBody, (req, res) => {
    Actions.insert(req.actions)
    .then(newAction => {
        res.status(200).json(newAction)
    })
    .catch(err => {
        res.status(500).json({ message: "internal server error"})
    })
    console.log('hello action')
})


router.delete('/:id', checkActionID, (req, res) => {
    Actions.remove(req.params.id)
        .then(resp => {
            res.status(200).json(req.actions)
        })
        .catch(err => 
            res.status(500).json({ message: 'internal server error'}))
})


router.put('/:id',checkActionID, checkActionBody, (req, res) => {
    Actions.update(req.params.id, req.body)
        .then(updatedAction => {
            res.status(200).json(updatedAction)
        })
        .catch(err => 
            res.status(500).json({ message: 'internal server error'}))
})


module.exports = router

// Write your "actions" router here!
