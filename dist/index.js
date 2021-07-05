"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const seed_1 = require("./seed");
const hello_1 = require("./resolvers/hello");
const clientResolver_1 = require("./resolvers/clientResolver");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const dbConnection = yield typeorm_1.createConnection();
        yield seed_1.seedDb(dbConnection).catch(err => console.log(err));
        const app = express_1.default();
        const apolloServer = new apollo_server_express_1.ApolloServer({
            schema: yield type_graphql_1.buildSchema({
                resolvers: [hello_1.HelloResolver, clientResolver_1.ClientResolver],
                validate: false
            }),
            context: ({ req, res }) => ({
                req,
                res
            })
        });
        apolloServer.applyMiddleware({ app });
        app.get('/', (_, res) => { res.send('Hello World'); });
        app.listen(3333, () => { console.log('server started on port 3333'); });
    });
}
main();
//# sourceMappingURL=index.js.map