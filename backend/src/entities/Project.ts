import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Project extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;
}