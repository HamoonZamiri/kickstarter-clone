import { IsDate, IsEmail, Length } from "class-validator";
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Length(6, 20)
    @Column({ unique: true, nullable: false })
    username: string;

    @IsEmail()
    @Index("email-index")
    @Column( {unique: true, nullable: false} )
    email: string;

    @Column({ nullable: false })
    password: string;

    @IsDate()
    @CreateDateColumn()
    createdAt: Date;

    @IsDate()
    @UpdateDateColumn()
    updatedAt: Date;

    toJSON() {
        return {...this, password: undefined};
    }

}