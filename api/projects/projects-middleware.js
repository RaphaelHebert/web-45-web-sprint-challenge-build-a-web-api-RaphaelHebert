const Projects = require('./projects-model')

function checkProjectId(req, res, next){
    const id = req.params.id
    Projects.get(id)
        .then(project => {
            if(project){
                req.project = project
                next()
            }else{
                res.status(404).json({ message: "project not found..."})
            }
        })
        .catch(err => {
            res.status(500).json({ message: "internal server error"})
        })
}

function checkProjectBody(req, res, next){
    console.log("req.body", req.body)
    const { name, description } = req.body
    if(!description || !name ){
        res.status(400).json({ message: "missing information"})
    }else{
        req.newProject = {
            description: description,
            name: name
        }
        next()
        }
        
    }



module.exports = {
    checkProjectId,
    checkProjectBody
}