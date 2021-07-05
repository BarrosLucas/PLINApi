import { Field, Int, ObjectType, registerEnumType } from "type-graphql";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm";
import { Run } from "./Run";

// Entity and schema definition

@ObjectType()
@Entity()
export class MotoTaxi extends BaseEntity {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column({nullable: false})
    name: string;

    @Field(() => String)
    @Column()
    cpf: string;

    @Field(() => String)
    @Column()
    hashed_password: string;

    @Field(() => String)
    @Column({nullable: true})
    photo: string;

    @Field(() => String)
    @Column()
    phone: string;

    @Field(() => String)
    @Column({default: 3})
    score: number;

    @Field(() => MotoTaxiStatus)
    @Column()
    status: MotoTaxiStatus;

    @Column()
    registrationNumber: string;

    @Column()
    liscensePlate: string;

    @OneToMany(() => Run, run => run.motoTaxi, {onDelete: "SET NULL", onUpdate: 'CASCADE'})
    runs: Run[]
}

// Enum and types definition

export enum MotoTaxiStatus {
    AVAILABLE,
    UNAVAILABLE
}

registerEnumType(
    MotoTaxiStatus,
    {
        name: 'MotoTaxiStatus',
        description: 'If the mototaxi is available or not'
    }
)
