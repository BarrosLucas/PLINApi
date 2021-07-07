import "reflect-metadata";
import express from 'express';
import {ApolloServer} from 'apollo-server-express'
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
//import { seedDb } from "./seed";
import { HelloResolver } from "./resolvers/hello";
import { ClientResolver } from "./resolvers/clientResolver";
import redis from 'redis'
import session from 'express-session'
import connectRedis from 'connect-redis'

async function main() {
    //const dbConnection = await createConnection()
    //await seedDb(dbConnection).catch( err => console.log(err))
    await createConnection() // Create DB connection
    const app = express() // Initialize express

    // Initilize redis
    const RedisStore = connectRedis(session) // Connext to redis using express session
    const redisCLient = redis.createClient()

    app.use(session({
        name: 'qid',
        store: new RedisStore({
            client: redisCLient,
            disableTouch: true
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365,  // 10 fucking years
            httpOnly: true,
            sameSite: 'lax', // csrf
            secure: false 
        },
        secret: "cjhgknlicjli",
        resave: false,
        saveUninitialized: false
    }))

    // Apply apollo middleware
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, ClientResolver],
            validate: false
        }),
        context: ({req, res}) => ({
            req,
            res
        })
    })

    apolloServer.applyMiddleware({app})

    //app.use(cors)

    app.get('/', (_, res) => {res.send('Hello World')})

    app.listen(3333, () => {console.log('server started on port 3333')})

}
main()



