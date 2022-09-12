
import { readFile, writeFile } from 'node:fs/promises'

export default class UserRepository {
    constructor({ file }) {
        this.file = file
    }

    async #currrentFileContent() {
        return JSON.parse(await readFile(this.file))
    }

    find() {
        return this.#currrentFileContent()
    }

    async create(data) {
        const currentFile = await this.#currrentFileContent()

        currentFile.push(data)

        await writeFile(this.file, JSON.stringify(currentFile))

        return data.id
    }
}