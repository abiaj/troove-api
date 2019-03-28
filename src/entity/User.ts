import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";

enum Gender {
  Male = "male",
  Female = "female"
}
enum UserType {
  User ,
  Businness ,
  Admin
}

@Entity("users")
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("text",{nullable: false})
    name: string;

    @Column({ type: "varchar", length:200, unique: true , nullable: false})
    username: string;

    @Column({ type: "varchar",length:200, unique: true , nullable: false })
    email: string;

    @Column({ length: 100, nullable: true })
    password: string|undefined;

    @Column({ length: 100, nullable: true })
    passwordHash: string|undefined;

    @Column({ nullable: true })
    phoneNumber: string;

    @Column("enum", { enum: Gender , nullable: false })
    gender: Gender;

    @Column("enum", { enum: UserType  , nullable: false})
    userType: UserType;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

}
