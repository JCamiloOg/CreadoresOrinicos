import express from "express";
import cors from "cors";
import { CORS_ORIGIN } from "./config/env";
import cookieParser from "cookie-parser";
import routes from "@/routes/index.routes";
import morgan from "morgan";
import { languageMiddlware } from "./middlewares/language.middleware";
const app = express();

app.use(cors({
    origin: CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(languageMiddlware);

app.use("/images/articles", express.static("public/articles"));
app.use("/images/events", express.static("public/events"));

app.use("/api", routes);

// app.use(errorHandler);

export default app;
