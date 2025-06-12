import express, { Application, Request, Response } from "express";
import cors from "cors";
import assetsRouter from "./assets/routes/assets.route";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Asset Management API");
});

app.use("/assets", assetsRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;