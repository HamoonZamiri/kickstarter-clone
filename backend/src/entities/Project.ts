import { Column, Entity, ManyToOne } from "typeorm";
import { BaseModel } from "./BaseModel";
import { User } from "./User";

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

    @Column({ default: 30 })
    daysTillExpiry: number;

    @ManyToOne(() => User, user => user.projects)
    user: User;

    toJSON() {
        return {...this, imgUrl: undefined}
    }
}