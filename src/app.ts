import express,{Request,Response} from 'express';
const app = express();
import morgan from "morgan";


if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const userRoutes = require("./routes/dataRoutes");

app.get("/", (req:Request, res:Response) => {
   res.status(201).json({
     ok: true,
     message:"server is running well"
   })
})


app.use(express.json());
app.use("/api", userRoutes);

export default app;