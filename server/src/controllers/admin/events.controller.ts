import { findAllEvents, findEventsByID, insertEvent, insertEventTranslations, modifyEvent, modifyEventImage, modifyEventTranslations, modifyStatusEvent } from "@/models/events.model";
import { CreateEvent, Events, EventsByID, UpdateEvent, updateEventTranslations } from "@/types/events";
import { t } from "@/utils/t";
import { Request, Response } from "express";
import { unlinkSync } from "fs";
import path from "path";
import sharp from "sharp";

export async function getEvents(req: Request<{ id?: number }, unknown, unknown, { lang?: string }>, res: Response<{ message: string, events?: Events[] | EventsByID[] }>) {
    try {
        const { id } = req.params;
        const { lang } = req.query;

        if (id) {
            const event = await findEventsByID(id, lang || req.lang);

            if (!event) return res.status(404).json({ message: t("events:EVENT_NOT_FOUND", req.lang) });

            return res.status(200).json({ message: t("events:GET_EVENT_SUCCESS", req.lang), events: event });
        }

        const events = await findAllEvents(req.lang);

        return res.status(200).json({ message: t("events:GET_EVENTS_SUCCESS", req.lang), events });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: t("events:GET_EVENTS_ERROR", req.lang) });
    }
}

export async function createEvent(req: Request<unknown, unknown, CreateEvent>, res: Response<{ message: string }>) {
    try {
        const file = req.file;

        if (!file) return res.status(400).json({ message: t("events:NOT_FILE_UPLOAD", req.lang) });

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

        return res.status(201).json({ message: t("events:CREATE_EVENT_SUCCESS", req.lang) });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: t("events:CREATE_EVENT_ERROR", req.lang) });
    }
}

export async function updateEvent(req: Request<{ id: string }, unknown, UpdateEvent>, res: Response<{ message: string }>) {
    try {
        const { id } = req.params;
        const { address, date, hour, inscription_link, modality } = req.body;

        await modifyEvent(date, hour, modality, address, inscription_link, Number(id));

        return res.status(200).json({ message: t("events:UPDATE_EVENT_SUCCESS", req.lang) });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: t("events:UPDATE_EVENT_ERROR", req.lang) });
    }
}

export async function updateEventTranslations(req: Request<{ id: string, lang: string }, unknown, updateEventTranslations>, res: Response<{ message: string }>) {
    try {
        const { id, lang } = req.params;
        const { title, description } = req.body;

        await modifyEventTranslations(lang, title, description, Number(id));

        return res.status(200).json({ message: t("events:UPDATE_EVENT_SUCCESS", req.lang) });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: t("events:UPDATE_EVENT_ERROR", req.lang) });
    }
}

export async function updateEventImage(req: Request<{ id: string }>, res: Response<{ message: string }>) {
    try {
        const file = req.file;
        if (!file) return res.status(400).json({ message: t("events:NOT_FILE_UPLOAD", req.lang) });

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

        return res.status(200).json({ message: t("events:UPDATE_EVENT_IMAGE_SUCCESS", req.lang) });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: t("events:UPDATE_EVENT_IMAGE_ERROR", req.lang) });
    }
}

export async function updateEventStatus(req: Request<{ id: string }, unknown, { status: 0 | 1 }>, res: Response<{ message: string }>) {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const response = await modifyStatusEvent(status, Number(id));
        if (response.affectedRows <= 0) return res.status(500).json({ message: t("events:UPDATE_EVENT_STATUS_ERROR", req.lang) });

        return res.status(200).json({ message: t("events:UPDATE_EVENT_STATUS_SUCCESS", req.lang) });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: t("events:UPDATE_EVENT_STATUS_ERROR", req.lang) });
    }
}

