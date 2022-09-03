require('dotenv').config({ path: 'env/.env' })

const port = process.env.PORT
const { handler } = require('./decorator')
const { createServer } = require('http')

class Server {
    @handler
    static async get() {
        return { statusCode: 200, message: 'Everything working' }
    }
}

const server = new Server()

createServer(Server.get).listen(port || 80, () => {
    console.log(`> server running on port ${port}`)
})
