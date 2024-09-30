import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Estudiantes } from "../models/estudianteModels";
import { AppDataSource } from "../db/conexion";


class EstudiantesController {

    async consultar(req: Request, res: Response) {
        try {
            const estudiantesRepository = AppDataSource.getRepository(Estudiantes);
            const data = await estudiantesRepository.find();
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
            const estudiantesRepository = AppDataSource.getRepository(Estudiantes);
            const registro = await estudiantesRepository.findOneBy({ id: Number(id) });
            if (!registro) {
                throw new Error('Estudiante no encontrado');
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
            const estudiantesRepository = AppDataSource.getRepository(Estudiantes);
           //const estudiantesRepository = getRepository(Estudiantes);
            const registro = await estudiantesRepository.save(req.body);
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
            const estudiantesRepository = AppDataSource.getRepository(Estudiantes);
            const registro = await estudiantesRepository.findOneBy({ id: Number(id) });
            if (!registro) {
                throw new Error('Estudiante no encontrado');
            }
            await estudiantesRepository.update({ id: Number(id) }, req.body);
            const registroactualizado = await estudiantesRepository.findOneBy({ id: Number(id) });
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
            const estudiantesRepository = AppDataSource.getRepository(Estudiantes);
            const registro = await estudiantesRepository.findOneBy({ id: Number(id) });
            if (!registro) {
                throw new Error('Estudiante no encontrado');
            }
            await estudiantesRepository.delete({ id: Number(id) });
            res.sendStatus(204);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).send(err.message);
            }
        }
    }
}

export default new EstudiantesController();
