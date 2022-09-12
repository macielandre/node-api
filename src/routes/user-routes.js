import { once } from 'node:events'
import User from '../models/user.js'

const routes = ({
    userService
}) => ({
    '/user:get': async (request, response) => {
        const users = await userService.find()

        response.write(JSON.stringify(users))
        return response.end()
    },
    '/user:post': async (request, response) => {
        const data = await once(request, 'data')
        const parsedData = JSON.parse(data)
        const user = new User(parsedData)

        const id = await userService.create(user)

        response.writeHead(201)
        response.write(JSON.stringify({
            message: 'User created with success',
            id
        }))

        return response.end()
    }
})

export { routes }