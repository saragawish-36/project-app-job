import path from "node:path";
import * as dotenv from "dotenv";
dotenv.config({ path: path.resolve(".env.dev") });
import express from "express";
import bootstrap from "./src/app.controller.js";
const app = express();
bootstrap(app, express);
app.listen(process.env.PORT, () =>
  console.log("Example app listening on port")
);
