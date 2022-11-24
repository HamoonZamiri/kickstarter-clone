import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Project extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ unique: true })
    title: string;

    @Column({ nullable: true })
    imgUrl: string;

    @Column({ nullable: false, default: "" })
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    toJSON() {
        return {...this}
    }
}