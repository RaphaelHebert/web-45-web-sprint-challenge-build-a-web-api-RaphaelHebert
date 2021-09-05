const dotenv = require('dotenv')
const server = require('./api/server')

dotenv.config()


const PORT = process.env.PORT 

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

