import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Cursos } from "../models/cursoModels";
import { AppDataSource } from "../db/conexion";
import { Profesores } from "../models/profesoresModels";
import { Estudiantes } from "../models/estudianteModels";

class cursosController {

    async consultar (req: Request, res: Response) {
        try{
            const cursosRepository = AppDataSource.getRepository(Cursos);
            const data = await cursosRepository.find({relations: {profesor: true, estudiantes: true}});
            res.status(200).json(data);
        }catch(err) {
            if (err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    async consultarDetalle (req: Request, res: Response) {
    const{ id } = req.params;
    try{
            const detalle = AppDataSource.getRepository(Cursos);
            const registro = await detalle.findOne({where: {id: Number(id) }, relations: {profesor: true, estudiantes: true}});
            if(!registro){
                throw new Error('Curso no encontrado')
            }
            res.status(200).json(registro);
        }catch(err) {
            if (err instanceof Error)
            res.status(500).send(err.message);
        }
    
    }

    async ingresar (req: Request, res: Response) {
    try{
            const { profesor } = req.body;

            const estudiantesRepository = AppDataSource.getRepository(Profesores);
            const profesor_id = await estudiantesRepository.findOneBy({ id: Number(profesor) });
            if (!profesor_id) {
                throw new Error('Profesor no encontrado');
            }
            const cursosid = AppDataSource.getRepository(Cursos);
            const registro = await cursosid.save(req.body);
            res.status(201).json(registro);
        }catch(err) {
            if (err instanceof Error)
            res.status(500).send(err.message);
        }
    }   

    async actualizar (req: Request, res: Response) {
        const{ id } = req.params;
        try{
            const {profesor} = req.body;
            const estudiantesRepository = AppDataSource.getRepository(Profesores);
            const registro = await estudiantesRepository.findOneBy({ id: Number(profesor) });
            if (!registro) {
                throw new Error('Profesor no encontrado');
            }
            const cursos = AppDataSource.getRepository(Cursos);
            const curso = await cursos.findOneBy({ id: Number(id)});
            if(!curso){
                throw new Error('Curso no encontrado');
            }
            await cursos.update({ id: Number(id) }, req.body);
            const registroactualizado = await cursos.findOneBy({ id: Number(id) });
            res.status(200).json(registroactualizado);
        }catch(err) {
            if (err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    async borrar (req: Request, res: Response) {
        const{ id } = req.params;
        try{
            const estudiantesRepository = AppDataSource.getRepository(Cursos);
            const registro = await estudiantesRepository.findOneBy({ id: Number(id) });
            if (!registro) {
                throw new Error('Curso no encontrado');
            }
            await estudiantesRepository.delete({ id: Number(id) });
            res.sendStatus(204);
        }catch(err) {
            if (err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    async asociarEstudiante (req: Request, res: Response) {
    try{
        const { estudiante_id, curso_id } = req.body;
        const estudiantesRepository = AppDataSource.getRepository(Estudiantes);
        const estudiante = await estudiantesRepository.findOneBy({ id: Number(estudiante_id)});

        const cursos = AppDataSource.getRepository(Cursos);
        const curso = await cursos.findOneBy({id: Number(curso_id)});
        if(!estudiante){
            throw new Error('Estudiante no encontrado');
        }
        if(!curso){
            throw new Error('Curso no encontrado');
        }

        curso.estudiantes = curso.estudiantes || [];
        curso.estudiantes.push(estudiante);

        const registro = await cursos.save(curso);
        res.status(200).json(registro);


        }catch(err) {
            if (err instanceof Error)
            res.status(500).send(err.message);
        }
    }   


}

export default new cursosController();