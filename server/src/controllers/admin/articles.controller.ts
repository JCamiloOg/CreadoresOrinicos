import { findAllArticles, findArticleByID, insertArticle, insertArticleTranslations, modifyArticle, modifyArticleImage, modifyArticleTranslations, modifyStatusArticle } from "@/models/articles.model";
import { Article, ArticleByID, CreateArticle, UpdateArticle } from "@/types/articles";
import { Request, Response } from "express";
import { unlinkSync } from "fs";
import path from "path";
import sharp from "sharp";


export async function getArticles(req: Request<{ id: string }>, res: Response<{ message: string, articles?: Article[] | ArticleByID[] }>) {
    try {
        const { id } = req.params;

        if (id) {
            const article = await findArticleByID(Number(id));

            if (!article) return res.status(404).json({ message: "Artículo no encontrado." });

            return res.status(200).json({ message: "Artículo obtenido correctamente.", articles: article });
        }

        const articles = await findAllArticles();

        return res.status(200).json({ message: "Artículos obtenidos correctamente.", articles });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener los artículos." });
    }
}


export async function createArticle(req: Request<unknown, unknown, CreateArticle>, res: Response) {
    try {
        const file = req.file;

        if (!file) return res.status(400).json({ message: "No se ha subido ningún archivo." });

        const filePath = file.path;
        const fileNoExt = file.filename.replace(/\.[^/.]+$/, "");

        const extWebp = ".webp";
        const fileWebp = path.join(path.join("public/articles", fileNoExt + extWebp));

        await sharp(filePath)
            .toFormat("webp")
            .toFile(fileWebp);

        unlinkSync(filePath);

        const { title_es, title_en, subtitle_es, subtitle_en, description_es, description_en, date } = req.body;

        const response = await insertArticle(date, fileNoExt + extWebp);

        await Promise.all([
            insertArticleTranslations(response.insertId, "es", title_es, subtitle_es, description_es),
            insertArticleTranslations(response.insertId, "en", title_en, subtitle_en, description_en)
        ]);

        return res.status(201).json({ message: "Artículo creado correctamente." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al crear el artículo." });
    }
}

export async function updateArticle(req: Request<{ id: string }, unknown, UpdateArticle>, res: Response<{ message: string }>) {
    try {
        const { id } = req.params;
        const { title_es, title_en, subtitle_es, subtitle_en, description_es, description_en, date } = req.body;


        await Promise.all([
            modifyArticle(date, Number(id)),
            modifyArticleTranslations(Number(id), "es", title_es, subtitle_es, description_es),
            modifyArticleTranslations(Number(id), "en", title_en, subtitle_en, description_en)
        ]);

        return res.status(200).json({ message: "Artículo actualizado correctamente." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al actualizar el artículo." });
    }
}

export async function updateArticleImage(req: Request<{ id: string }>, res: Response<{ message: string }>) {
    try {
        const file = req.file;

        if (!file) return res.status(400).json({ message: "No se ha subido ningún archivo." });

        const { id } = req.params;

        const filePath = file.path;
        const fileNoExt = file.filename.replace(/\.[^/.]+$/, "");
        const extWebp = ".webp";
        const fileWebp = path.join(path.join("public/articles", fileNoExt + extWebp));

        await sharp(filePath)
            .toFormat("webp")
            .toFile(fileWebp);

        unlinkSync(filePath);

        const [article] = await Promise.all([
            findArticleByID(Number(id)),
            modifyArticleImage(fileNoExt + extWebp, Number(id))
        ]);

        unlinkSync(path.join("public/articles", article[0].main_image));

        return res.status(200).json({ message: "Imagen del artículo actualizada correctamente." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al actualizar la imagen del artículo." });
    }
}


export async function updateArticleStatus(req: Request<{ id: string }, unknown, { status: 0 | 1 }>, res: Response) {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const response = await modifyStatusArticle(Number(id), status);

        if (response.affectedRows <= 0) return res.status(500).json({ message: "Error al actualizar el estado del artículo." });

        return res.status(200).json({ message: "Estado del artículo actualizado correctamente." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al actualizar el estado del artículo." });
    }
}