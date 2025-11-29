import express from "express";
import cors from "cors";
import { CORS_ORIGIN } from "./config/env";
import cookieParser from "cookie-parser";
import routes from "@/routes/index.routes";
import morgan from "morgan";
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

// app.use(AuthUser);

app.use("/api", routes);

// app.use(errorHandler);

export default app;
