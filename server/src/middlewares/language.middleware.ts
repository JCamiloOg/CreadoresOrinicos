import { getLangFromHeader } from "@/utils/formatHeaderLanguage";
import { NextFunction, Request, Response } from "express";


export function languageMiddlware(req: Request, _: Response, next: NextFunction) {
    console.log(getLangFromHeader(req.headers["accept-language"]));
    req.lang = getLangFromHeader(req.headers["accept-language"]);
    next();
}

