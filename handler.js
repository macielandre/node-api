import { parse, fileURLToPath } from 'node:url'
import { generateInstance } from './src/factories/user-factory.js'
import { routes } from './src/routes/user-routes.js'
import { join, dirname } from 'node:path'

const currentDir = dirname(fileURLToPath(import.meta.url))
const filePath = join(currentDir, './databases', 'database.json')

const userService = generateInstance({
    filePath
})

const userRoutes = routes({ 
    userService
})

const allRoutes = {
    ...userRoutes,
    default: (request, response) => {
        response.writeHead(404)
        response.write('Not found')
        response.end()
    }
}

function handler(request, response) {
    const { url, method } = request
    const { pathname } = parse(url, true)
    const key = `${pathname}:${method.toLowerCase()}`

    const chosenRoute = allRoutes[key] || allRoutes.default

    console.log({ url, method, key })

    return Promise.resolve(chosenRoute(request, response)).catch(handleError(response))
}

function handleError(response) {
    return error => {
        console.log('Something bad happened**', error.stack)
        response.writeHead(500)
        response.write(JSON.stringify({
            error: 'Internal server error'
        }))

        return response.end()
    }
}

export default handler