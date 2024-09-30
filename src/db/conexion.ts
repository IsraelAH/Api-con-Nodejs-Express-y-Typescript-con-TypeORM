import { DataSource } from "typeorm";
import { Estudiantes } from "../models/estudianteModels";
import { Profesores } from "../models/profesoresModels";
import { Cursos } from "../models/cursoModels";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "cursos",
    logging : true,
    entities: [Estudiantes, Profesores, Cursos],
    synchronize: false

});