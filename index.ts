import mongoose from "mongoose";
import http from "http";
import { routes } from "./src/route"; // Check if this path is correct
import express, { Request, Response } from "express";

const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,PUT, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

const PORT = 3000;
export const TOKEN_KEY = "11223344";
routes(app); // Check if app is an instance of express.Application
const URL = "mongodb+srv://wwwburjsoft:gBLTbWrZsDYS9kR5@cluster0.k2bwmju.mongodb.net/";
  app.listen(PORT, () => {
  console.log(`*** App is listening ${PORT} ***`);
});

// root routes
app.get("/", (req: Request, res:Response) => {
  res.status(200).json({ message: "*** API is running fast! ***" });
});

async function connection() {
  await mongoose.connect(URL).then(() => {
    console.log("*** Connected With MongoDB ***");
  });
}
connection();

export default app;
