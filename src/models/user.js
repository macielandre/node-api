import { randomUUID } from 'node:crypto'

export default class User {
    constructor({ name, age, country }) {
        this.id = randomUUID()
        this.name = name
        this.age = age
        this.country = country
    }
}