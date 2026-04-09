import dotenv from "dotenv";

dotenv.config();

import app from "./app.js";

app.listen(3001,()=>{
    console.log("theater Servive Running On Port 3001");
})