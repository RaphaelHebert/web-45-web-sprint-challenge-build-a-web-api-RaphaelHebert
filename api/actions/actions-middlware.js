const { get } = require("./actions-router")
const Actions =  require("./actions-model")

// add middlewares here related to actions

function checkActionID(req, res, next){
    const id = req.params.id
    Actions.get(id)
        .then( actions => {
            console.log(actions)
            if(actions === null){
                res.status(404).json({ message: "no actions found"})
            }else{
                req.actions = actions
                next()
            }
        })
        .catch(next)
}
function checkActionBody(req, res, next){
    const { notes, description, project_id } = req.body
    if(!notes || !description || !project_id){
        res.status(400).json({ message: 'missing information'})
    }else{
        req.actions = {
            notes: notes,
            description: description,
            project_id: project_id
        }
        next()
    }
}

module.exports = {
    checkActionID,
    checkActionBody
}