import { Field, Float, Int, ObjectType, registerEnumType } from "type-graphql";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne} from "typeorm";
import { Client } from "./Client";
import { MotoTaxi } from "./MotoTaxi";

// Entity and schema definition

@ObjectType()
@Entity()
export class Run extends BaseEntity {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Date)
    @Column()
    acceptedAt: Date;

    @Field(() => Float)
    @Column()
    price: number;

    @Field(() => RunType)
    @Column()
    runType: RunType;

    @Field(() => RunStatus)
    @Column()
    runStatus: RunStatus;

    @ManyToOne(() => Client, client => client.runs, {onDelete: 'SET NULL', onUpdate: 'CASCADE', cascade:true})
    client: Client;

    @ManyToOne(() => MotoTaxi, motoTaxi => motoTaxi.runs, {onDelete: 'SET NULL', onUpdate: 'CASCADE', cascade: false})
    motoTaxi: MotoTaxi;


}

// Enum and types definition

export enum RunType {
    DELIVERY,
    TAXI
}

export enum RunStatus {
    OPEN,
    CLOSED
}

registerEnumType(
    RunType,
    {
        name: 'Run Type',
        description: 'If the run is a deliery or a passenger'
    }
)

registerEnumType(
    RunStatus,
    {
        name: 'Run Status',
        description: 'If a run has ended or not'
    }
)
