import * as dotenv from 'dotenv'
dotenv.config({ path: 'env/.env' })

const port = process.env.PORT || 80
import { createServer } from 'http'
import handler from './handler.js'

const server = createServer(handler).listen(port, () => {
    console.log(`> server running on port ${port}`)
})

export {
    server
}
