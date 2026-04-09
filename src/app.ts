import express from "express";
import theaterRoute from "../src/route/route.theaters.js";
import theaterScreenRoute from "../src/route/route.screens.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use( express.json() );
app.use("/theaters", theaterRoute);
app.use("/theaters/:theater_public_id/theater_screen", theaterScreenRoute);

export default app;