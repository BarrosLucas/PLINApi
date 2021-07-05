import { Field, Int, ObjectType } from "type-graphql";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, CreateDateColumn} from "typeorm";
import { Run } from "./Run";
import bcryptjs from 'bcryptjs'

// Entity and schema definition

@ObjectType()
@Entity()
export class Client extends BaseEntity {


    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column({nullable: false})
    name: string;

    @Field(() => String)
    @Column({nullable: false})
    userName: string;

    @Field(() => String)
    @Column({unique: true})
    cpf: string;

    @Field(() => String)
    @Column()
    hashed_password: string;

    @Field(() => String, {nullable: true})
    @Column({nullable: true})
    photo: string;

    @Field(() => String)
    @Column()
    phone: string;

    @Field(() => String)
    @Column({default: 3})
    score: number;

    @Field(() => String)
    @CreateDateColumn()
    createdAt = Date();

    @Field(() => String)
    @CreateDateColumn()
    updatedAt = Date();

    @OneToMany(() => Run, run => run.client, {onDelete: 'SET NULL', onUpdate: 'CASCADE'})
    runs: Run[]
}

export async function hashPassword (pwd: string): Promise<string> {
    const salt = await bcryptjs.genSalt(10)
    return bcryptjs.hash(pwd, salt)
}

export async function verifyHash(pwd: string, haashedPwd: string): Promise<Boolean>{
    const result = bcryptjs.compare(pwd, haashedPwd)
    return result
}