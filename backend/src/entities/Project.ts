import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BaseModel } from "./BaseModel";

@Entity()
export class Project extends BaseModel{

    @Column({ unique: true })
    title: string;

    @Column({ nullable: true })
    imgUrl: string;

    @Column({ nullable: false, default: "" })
    description: string;

    toJSON() {
        return {...this}
    }
}