import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    firstName: string;

    @Column("text")
    lastName: string;

    @Column("text")
    email: string;

    @Column("text")
    password: string;

    @Column("text")
    mobileprefix: string;

    @Column("text")
    mobile: string;
}
