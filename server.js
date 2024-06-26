import { fastify } from "fastify";
import cors from '@fastify/cors'

import { DatabaseMemory } from "./database-memory.js";
import {DatabaseSql} from "./database/database-sql.js";

const server = fastify();

await server.register(cors, {
    origin: '*',
    methods: ['GET']
})

// const database = new DatabaseMemory()
const database = new DatabaseSql()

server.get('/anime', async () => {
    return await database.list()
})


server.post('/anime', async (req, res) => {
    const { name, daterealese, season, rating, mc, villain, img} = req.body

    await database.create({
        name,
        daterealese,
        season,
        rating,
        mc,
        villain,
        img
    })

    return res.status(201).send()
})

server.put('/anime/:id', async (req, res) => {
   const id = req.params.id
   const { name, daterealese, season, rating, mc, villain, img} = req.body

   await database.update(id, {
    name,
    daterealese,
    season,
    rating,
    mc,
    villain,
    img
   })

   res.status(204).send()
})

server.delete('/anime/:id',async (req, res) => {
    const id = req.params.id
    await database.delete(id)
    return res.status(200).send()
})

server.listen({
    port: 3333
})