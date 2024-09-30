import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Cursos } from "./cursoModels";

@Entity('profesores')
export class Profesores{

    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    nombre: String;

    @Column()
    apellido: String;

    @Column()
    email: String;

    @Column()
    profesion: String;

    @Column()
    telefono: String;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Cursos, (curso) => curso.profesor)
    cursos: Cursos[]

}