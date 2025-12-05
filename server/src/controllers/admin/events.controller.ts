import { findAllEvents, findEventsByID, insertEvent, insertEventTranslations, modifyEvent, modifyEventImage, modifyEventTranslations, modifyStatusEvent } from "@/models/events.model";
import { CreateEvent, Events, EventsByID, UpdateEvent } from "@/types/events";
import { Request, Response } from "express";
import { unlinkSync } from "fs";
import path from "path";
import sharp from "sharp";

export async function getEvents(req: Request<{ id?: number }>, res: Response<{ message: string, events?: Events[] | EventsByID[] }>) {
    try {
        const { id } = req.params;
        if (id) {
            const event = await findEventsByID(id);

            if (!event) return res.status(404).json({ message: "Evento no encontrado." });

            return res.status(200).json({ message: "Evento obtenido correctamente.", events: event });
        }

        const events = await findAllEvents();

        return res.status(200).json({ message: "Eventos obtenidos correctamente.", events });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener los eventos." });
    }
}

export async function createEvent(req: Request<unknown, unknown, CreateEvent>, res: Response<{ message: string }>) {
    try {
        const file = req.file;

        if (!file) return res.status(400).json({ message: "No se ha subido ningún archivo." });

        const filePath = file.path;
        const fileNoExt = file.filename.replace(/\.[^/.]+$/, "");

        const extWebp = ".webp";
        const fileWebp = path.join(path.join("public/events", fileNoExt + extWebp));

        await sharp(filePath)
            .toFormat("webp")
            .toFile(fileWebp);

        unlinkSync(filePath);

        const { title_es, title_en, description_es, description_en, address, date, hour, inscription_link, modality } = req.body;
        const response = await insertEvent(date, hour, modality, address, inscription_link, fileNoExt + extWebp);

        await Promise.all([
            insertEventTranslations(response.insertId, "es", title_es, description_es),
            insertEventTranslations(response.insertId, "en", title_en, description_en)
        ]);

        return res.status(201).json({ message: "Evento creado correctamente." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al crear el evento." });
    }
}

export async function updateEvent(req: Request<{ id: string }, unknown, UpdateEvent>, res: Response<{ message: string }>) {
    try {
        const { id } = req.params;
        const { address, date, description_en, description_es, hour, inscription_link, modality, title_en, title_es } = req.body;


        await Promise.all([
            modifyEvent(date, hour, modality, address, inscription_link, Number(id)),
            modifyEventTranslations("es", title_es, description_es, Number(id)),
            modifyEventTranslations("en", title_en, description_en, Number(id))
        ]);

        return res.status(200).json({ message: "Evento actualizado correctamente." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al actualizar el evento." });
    }
}

export async function updateEventImage(req: Request<{ id: string }>, res: Response<{ message: string }>) {
    try {
        const file = req.file;
        if (!file) return res.status(400).json({ message: "No se ha subido ningún archivo." });

        const { id } = req.params;

        const filePath = file.path;
        const fileNoExt = file.filename.replace(/\.[^/.]+$/, "");

        const extWebp = ".webp";
        const fileWebp = path.join(path.join("public/events", fileNoExt + extWebp));

        await sharp(filePath)
            .toFormat("webp")
            .toFile(fileWebp);

        unlinkSync(filePath);

        const [event] = await Promise.all([
            findEventsByID(Number(id)),
            modifyEventImage(fileNoExt + extWebp, Number(id))
        ]);

        unlinkSync(path.join("public/events", event[0].image));

        return res.status(200).json({ message: "Imagen del evento actualizada correctamente." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al actualizar la imagen del evento." });
    }
}

export async function updateEventStatus(req: Request<{ id: string }, unknown, { status: 0 | 1 }>, res: Response<{ message: string }>) {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const response = await modifyStatusEvent(status, Number(id));
        if (response.affectedRows <= 0) return res.status(500).json({ message: "Error al actualizar el estado del evento." });

        return res.status(200).json({ message: "Estado del evento actualizado correctamente." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al actualizar el estado del evento." });
    }
}

