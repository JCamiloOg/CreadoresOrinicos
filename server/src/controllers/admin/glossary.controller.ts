import { findAllWords, findWordByID, insertWord, inserWordTranslations, modifyStatusWord, modifyWord } from "@/models/glossary.model";
import { Glossary, GlossaryByID } from "@/types/glossary";
import { Request, Response } from "express";


export async function getWords(req: Request<{ id?: number }>, res: Response<{ message: string, words?: Glossary[] | GlossaryByID[] }>) {
    try {
        const { id } = req.params;

        if (id) {
            const word = await findWordByID(id);
            if (!word) return res.status(404).json({ message: "Palabra no encontrada." });

            return res.status(200).json({ message: "Palabra obtenida correctamente.", words: word });
        }

        const words = await findAllWords();
        return res.status(200).json({ message: "Palabras obtenidas correctamente.", words });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las palabras." });
    }
}

export async function createWord(req: Request<unknown, unknown, { word_es: string, word_en: string, description_es: string, description_en: string }>, res: Response<{ message: string }>) {
    try {
        const { description_en, description_es, word_en, word_es } = req.body;

        const response = await insertWord();

        await inserWordTranslations(response.insertId, word_es, description_es, "es");
        await inserWordTranslations(response.insertId, word_en, description_en, "en");

        if (response.affectedRows <= 0) return res.status(500).json({ message: "Error al crear la palabra." });

        return res.status(201).json({ message: "Nueva palabra creada correctamente." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear la palabra." });
    }
}


export async function updateWord(req: Request<{ id: string }, unknown, { word_es: string, word_en: string, description_es: string, description_en: string }>, res: Response<{ message: string }>) {
    try {
        const { id } = req.params;
        const { word_es, word_en, description_en, description_es } = req.body;

        await modifyWord(Number(id), word_es, description_es, "es");
        await modifyWord(Number(id), word_en, description_en, "en");

        return res.status(200).json({ message: "Palabra actualizada correctamente." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar la palabra." });
    }
}


export async function updateStatusWord(req: Request<{ id: string }, unknown, { status: 0 | 1 }>, res: Response<{ message: string }>) {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const response = await modifyStatusWord(Number(id), status);

        if (response.affectedRows <= 0) return res.status(500).json({ message: "Error al actualizar el estado de la palabra." });

        return res.status(200).json({ message: "Estado de la palabra actualizado correctamente." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar el estado de la palabra." });
    }
}