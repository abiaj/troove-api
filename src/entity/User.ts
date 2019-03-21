import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity("users")
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    name: string;

    @Column("text")
    username: string;

    @Column("text")
    email: string;

    @Column({ nullable: true })
    phoneNumber: string;

    @Column("text")
    gender: string;

    @Column("text")
    gender: string;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @Column({ default: false })
    isActive: boolean;



}
