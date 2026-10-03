import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import fs from "fs";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import ErrorHandler from "./middlewares/error.middleware";
import authRouter from "./routes/auth.routes";
import taskRouter from "./routes/task.routes";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan("dev"));

app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRouter);
app.use(ErrorHandler);

const frontendPath = path.resolve(__dirname, "../../frontend/dist");
if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

app.listen(Number(port), "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
