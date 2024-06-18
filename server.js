import { fastify } from "fastify";
import { DatabaseMemory } from "./database-memory.js";

const server = fastify();

const database = new DatabaseMemory()

server.get('/anime', () => {
    return database.list()
})

server.post('/anime', (req, res) => {
    const { name, daterealese, seasons, rating, mc, villain, img} = req.body

    database.create({
        name,
        daterealese,
        seasons,
        rating,
        mc,
        villain,
        img
    })

    return res.status(201).send()
})

server.put('/anime/:id', (req, res) => {
   const id = req.params.id
   const { name, daterealese, seasons, rating, mc, villain, img} = req.body

   database.update(id, {
    name,
    daterealese,
    seasons,
    rating,
    mc,
    villain,
    img
   })

   res.status(204).send()
})

server.delete('/anime/:id', (req, res) => {
    const id = req.params.id
    database.delete(id)
    return res.status(200).send()
})

server.listen({
    port: 3333
})