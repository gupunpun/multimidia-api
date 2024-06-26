import { randomUUID } from 'node:crypto'
import { db } from './sql.js'

export class DatabaseSql {
    async list() {
        const animes = await db.query`select * from anime`
        return animes.recordset
    }

    async create(anime) {
        const animeId = randomUUID()

        const { name, daterealese, season, rating, mc, villain, img } = anime

        await db.query`insert into anime (id, name, daterealese, season, rating, mc, villain, img) values
            (${animeId}, ${name}, ${daterealese}, ${season}, ${rating}, ${mc}, ${villain},${img})`
    }

    async update(id, anime) {
        const {name, daterealese, season, rating, mc, villain, img } = anime

        await db.query`update anime set name = ${name}, daterealese = ${daterealese}, season = ${season}, rating = ${rating}, mc = ${mc}, villain = ${villain}, img = ${img}
        where id = ${id}`
    }

    async delete(id) {
        console.log(`delete from anime where id = '${id}'`)
        await db.query`delete from anime where id = '${id}'`
    }
}