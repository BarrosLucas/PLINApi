import "reflect-metadata";
import express from 'express';
import {ApolloServer} from 'apollo-server-express'
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { seedDb } from "./seed";
import { HelloResolver } from "./resolvers/hello";
import { ClientResolver } from "./resolvers/clientResolver";






async function main() {

    const dbConnection = await createConnection()
    await seedDb(dbConnection).catch( err => console.log(err))
    const app = express()

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



