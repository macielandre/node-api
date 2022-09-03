function handler(target, { isStatic, isPrivate, name, kind }) {
    if(kind != 'method') return target

    return async (request, response) => {
        const data = await target.apply(this, [request, response])

        response.writeHead(data.statusCode)
        response.end(JSON.stringify(data))
    }
}

module.exports = {
    handler
}