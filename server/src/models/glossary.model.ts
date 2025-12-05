import conn from "@/config/db";
import { Glossary, GlossaryByID } from "@/types/glossary";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export async function findAllWords() {
    try {
        const [row] = await conn.query<Glossary[] & RowDataPacket[]>("SELECT * FROM glossary g INNER JOIN glossary_translations gt ON gt.word_id = g.id");
        return row;
    } catch (error) {
        console.error(error);
        throw new Error("Error al obtener las palabras.");
    }
}

export async function findWordByID(id: number) {
    try {
        const [row] = await conn.query<GlossaryByID[] & RowDataPacket[]>("SELECT g.id, g.status, gt.word, gt.description FROM glossary g INNER JOIN glossary_translations gt ON gt.word_id = g.id WHERE g.id = ? ", [id]);
        return row;
    } catch (error) {
        console.error(error);
        throw new Error("Error al obtener la palabra.");
    }
}


export async function insertWord() {
    try {
        const [result] = await conn.query<ResultSetHeader>("INSERT INTO glossary (status) VALUES (?)", [1]);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Error al crear la palabra.");
    }
}

export async function inserWordTranslations(id: number, word: string, description: string, lang: "es" | "en") {
    try {
        const [result] = await conn.query<ResultSetHeader>("INSERT INTO glossary_translations (lang, word, description, word_id) VALUES (?, ?, ?, ?)", [lang, word, description, id]);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Error al crear las traducciones de la palabra.");
    }
}

export async function modifyWord(id: number, word: string, description: string, lang: "es" | "en") {
    try {
        const [result] = await conn.query<ResultSetHeader>("UPDATE glossary_translations SET word = ?, description = ? WHERE word_id = ? AND lang = ?", [word, description, id, lang]);
        return result;
    } catch (error) {
        console.error(error);
        throw new Error("Error al actualizar la palabra.");
    }
}

export async function modifyStatusWord(id: number, status: 0 | 1) {
    try {
        if (status == 0) {
            const [result] = await conn.query<ResultSetHeader>("UPDATE glossary SET status = ?, delete_at = NOW() WHERE id = ?", [status, id]);
            return result;
        } else {
            const [result] = await conn.query<ResultSetHeader>("UPDATE glossary SET status = ?, delete_at = NULL WHERE id = ?", [status, id]);
            return result;
        }
    } catch (error) {
        console.error(error);
        throw new Error("Error al actualizar el estado de la palabra.");
    }
}

