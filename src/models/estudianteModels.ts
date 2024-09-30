import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn  } from "typeorm"

@Entity('Estudiantes')
export class Estudiantes{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    dni: string;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column()
    email: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}