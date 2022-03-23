import express,{Response} from 'express';
const app = express();
import morgan from "morgan";


if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const userRoutes = require("./routes/dataRoutes");
app.get("/",(res:Response) => {
 res.send("<h1>hello world</h1>");
})
app.use(express.json());
app.use("/api", userRoutes);

export default app;