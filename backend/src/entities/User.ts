import { IsEmail, Length } from "class-validator";
import { BeforeInsert, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import bcrypt from "bcryptjs";
import { BaseModel } from "./BaseModel";

@Entity()
export class User extends BaseModel {
    @Length(6, 20)
    @Column({ unique: true, nullable: false })
    username: string;

    @IsEmail()
    @Index("email-index")
    @Column( {unique: true, nullable: false} )
    email: string;

    @Column({ nullable: false })
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    static async comparePassword(password: string, hashedPassword: string){
        return await bcrypt.compare(password, hashedPassword);
    }

    toJSON() {
        return {...this, password: undefined};
    }

}