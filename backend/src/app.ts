import express from "express";
import APIRouter from "./routes/api";

export const app = express();

app.use(express.json());
app.use("/api", APIRouter);
