import {BaseEntity, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";


export class WithIdAndTimestampEntity extends BaseEntity{

    @PrimaryGeneratedColumn({name:'id' , type:'int8'})
    id:number;

    @CreateDateColumn({name:"created_at"})
    createdAt:Date;

    @UpdateDateColumn({name:"updated_at"})
    updatedAt:Date;
}