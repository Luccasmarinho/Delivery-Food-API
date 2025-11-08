import dotenv from "dotenv";
dotenv.config();
import Express from "express";
import routes from "./routes/exportRoutes/exportRoutes.js";
import handleError from "./middleware/handleError.js";
const app = Express();

app.use(Express.json());
app.use(routes);
app.use(handleError);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));
