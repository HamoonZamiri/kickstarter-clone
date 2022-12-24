import { Column, Entity } from "typeorm";
import { BaseModel } from "./BaseModel";

@Entity()
export class Project extends BaseModel{

    @Column({ unique: true })
    title: string;

    @Column({ nullable: true })
    imgUrl: string;

    @Column({ nullable: false, default: "" })
    description: string;

    @Column({ default: 0 })
    backers: number;

    @Column()
    daysTillExpiry: number;

    toJSON() {
        return {...this, imgUrl: undefined}
    }
}