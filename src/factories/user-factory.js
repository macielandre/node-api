import UserRepository from '../repositories/user-repository.js'
import UserService from '../services/user-service.js'

const generateInstance = ({
    filePath
}) => {
    //db connections

    const userRepository = new UserRepository({
        file: filePath
    })

    const userService = new UserService({
        userRepository
    })

    return userService
}

export {
    generateInstance
}