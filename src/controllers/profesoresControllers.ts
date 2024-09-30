import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Profesores } from "../models/profesoresModels";
import { AppDataSource } from "../db/conexion";

class ProfesoresController{

    async consultar(req: Request, res: Response) {
        try {
            const ProfesoresRepository = AppDataSource.getRepository(Profesores);
            const data = await ProfesoresRepository.find();
            res.status(200).json(data);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    async consultarDetalle(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const ProfesoresRepository = AppDataSource.getRepository(Profesores);
            const registro = await ProfesoresRepository.findOneBy({ id: Number(id) });
            if (!registro) {
                throw new Error('Profesor no encontrado');
            }
            res.status(200).json(registro);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    async ingresar(req: Request, res: Response) {
        try {
            const ProfesoresRepository = AppDataSource.getRepository(Profesores);
           //const ProfesoresRepository = getRepository(Profesores);
            const registro = await ProfesoresRepository.save(req.body);
            res.status(201).json(registro);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    async actualizar(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const ProfesoresRepository = AppDataSource.getRepository(Profesores);
            const registro = await ProfesoresRepository.findOneBy({ id: Number(id) });
            if (!registro) {
                throw new Error('Profesor no encontrado');
            }
            await ProfesoresRepository.update({ id: Number(id) }, req.body);
            const registroactualizado = await ProfesoresRepository.findOneBy({ id: Number(id) });
            res.status(200).json(registroactualizado);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }

    async borrar(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const ProfesoresRepository = AppDataSource.getRepository(Profesores);
            const registro = await ProfesoresRepository.findOneBy({ id: Number(id) });
            if (!registro) {
                throw new Error('Profesor no encontrado');
            }
            await ProfesoresRepository.delete({ id: Number(id) });
            res.sendStatus(204);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }
    
}

export default new ProfesoresController ();