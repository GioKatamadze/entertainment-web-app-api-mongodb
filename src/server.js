import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

import connectToMongo from "./config/mongo.js";
import userRoutes from "./routes/userRoutes.js";
import movieRouter from "./routes/movieRouter.js";
import swaggerMiddleware from "./middlewares/swagger-middleware.js";

dotenv.config();

connectToMongo();

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use("/images", express.static("public/storage"));
app.use("/api", cors(), movieRouter);
app.use("/api", cors(), userRoutes);
app.use("/", cors(), ...swaggerMiddleware());

app.listen(process.env.PORT || 5000);
