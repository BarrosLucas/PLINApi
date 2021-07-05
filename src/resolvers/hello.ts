import { Query } from "type-graphql";

export class HelloResolver {
    @Query(() => String)
    hello(): String{
        return 'Hello World'
    }
}