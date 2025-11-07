import dotenv from "dotenv";
dotenv.config();
import Express from "express";
const app = Express();

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));
