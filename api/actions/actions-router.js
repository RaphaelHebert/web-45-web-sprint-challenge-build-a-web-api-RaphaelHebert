const Actions = require('./actions-model')
const express = require('express')

const router = express.Router()

const { checkActionID, checkActionBody } = require('./actions-middlware')

router.get('/', (req, res, next) => {
    Actions.get()
        .then( actions => {
            res.status(200).json(actions)
        })
        .catch(next)
})


router.get('/:id',checkActionID,  (req, res) => {
    res.status(200).json(req.actions)
})


router.post('/',checkActionBody, (req, res, next) => {
    Actions.insert(req.actions)
    .then(newAction => {
        res.status(200).json(newAction)
    })
    .catch(next)
})


router.delete('/:id', checkActionID, (req, res, next) => {
    Actions.remove(req.params.id)
        .then(resp => {
            res.status(200).json(req.actions)
        })
        .catch(next)
})


router.put('/:id',checkActionID, checkActionBody, (req, res, next) => {
    Actions.update(req.params.id, req.body)
        .then(updatedAction => {
            res.status(200).json(updatedAction)
        })
        .catch(next)
})


module.exports = router

// Write your "actions" router here!
