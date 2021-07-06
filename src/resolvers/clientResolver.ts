import { Client } from "../entity/Client";
import { Arg, Ctx, Int, Mutation, ObjectType, Query, Field } from "type-graphql";
import { MyContext } from "../types";
import { getConnection } from "typeorm";
import argon2 from 'argon2'

declare module "express-session" { // about this module - there was a issue with session
    interface Session {            // recognizing new elements in it, so its needed to do
      clientId: number;            // this black magic here
    }
  }

// ObjectTypes
@ObjectType()
class FieldError {
    @Field(() => String)
    field: string

    @Field(() => String)
    message: string
}

@ObjectType()
class ClientResponse{
    @Field(() => [FieldError], {nullable:true})
    errors?: FieldError[]

    @Field(() => Client, {nullable:true})
    client?: Client
}


// Resolver 
export class ClientResolver {

    // Querys
    @Query(() => [Client])
    async getClients(
        @Ctx() _ctx: MyContext
    ): Promise<Client[]>{
        return Client.find()
    }

    @Query(() => Client, {nullable: true})
    async getClient(
        @Arg('cpf' , ()=> String) cpf: String,
        @Ctx() _ctx: MyContext
    ): Promise<Client | undefined>{

        const client = Client.findOne({
            where: {
                cpf: cpf
            }
        })

        return client
        
    }

    // Mutations
    @Mutation(() => ClientResponse)
    async createClient(
        @Ctx() _ctx: MyContext,
        @Arg('name', () => String) name: string,
        @Arg('userName', () => String) userName: string,
        @Arg('cpf', () => String) cpf: string,
        @Arg('password', () => String) password: string,
        @Arg('photo', () => String, {nullable: true}) photo: string,
        @Arg('phone', () => String) phone: string,
    ): Promise<ClientResponse>{


        if(userName.length <= 2){
            return {
                errors: [{
                    field: 'username',
                    message: "length must be greater than 2"
                }]
            }
        }

        if(password.length <= 3){
            return {
                errors: [{
                    field: 'username',
                    message: "password must be greater than 2"
                }]
            }
        }

        const newClient = Client.create({
            name: name,
            userName: userName,
            cpf: cpf,
            photo: photo,
            phone: phone,
            hashed_password: await argon2.hash(password)
        })

        const result = await newClient.save()
        .then(client => {
            return {
                client: client
            }
        })
        .catch(err => {
            console.log(err.message)
            return {
                errors: [{
                    field: 'fb',
                    message: 'Deu ruim'
                }]
            }
        })

        return result

        
    }

    @Mutation(() => ClientResponse)
    async login(
        @Ctx() {req}: MyContext,
        @Arg('userName', () => String) userName: string, 
        @Arg('password', () => String) password: string,

    ): Promise<ClientResponse>{
        const client = await Client.findOne({where: {userName: userName}})

        if(userName.length <= 2){
            return {
                errors: [{
                    field: 'username',
                    message: "length must be greater than 2"
                }]
            }
        }

        if(password.length <= 3){
            return {
                errors: [{
                    field: 'username',
                    message: "password must be greater than 2"
                }]
            }
        }

        if (!client){
            return {
                errors: [{
                    field: 'username',
                    message: "Username doesn't exist"
                }]
            }
        }

        const valid = await argon2.verify(client.hashed_password, password)

        if(!valid){
            return {
                errors: [{
                    field: 'password',
                    message: "Incorrect password"
                }]
            }
        }

        req.session.clientId = client.id


        return {
            client: client
        }
    }

    @Mutation(() => Client , {nullable: true})
    async updateClient(
        @Ctx() _ctx: MyContext,
        @Arg('name', () => String) name: string,
        @Arg('cpf', () => String) cpf: string,
        @Arg('photo', () => String, {nullable: true}) photo: string,
        @Arg('phone', () => String) phone: string,
    ): Promise<Client | null>{

        const client = await Client.findOne({where:{cpf: cpf}})

        if(!client){
            return null
        }
        await getConnection()
        .createQueryBuilder()
        .update(Client)
        .set({name: name, photo: photo, phone: phone})
        .where('id = :id', {id:client.id})
        .execute()

        return client
    }

    @Mutation(() => Boolean)
    async deleteClient(
        @Ctx() _ctx: MyContext,
        @Arg('id', () => Int) id: number
    ): Promise<Boolean>{
        const client = await Client.findOne({where:{id: id}})
        if (!client){
            return true
        }
        client.remove()
        return true
    }
}