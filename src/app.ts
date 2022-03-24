import express,{Request,Response} from 'express';
const app = express();
import morgan from "morgan";
import cors from "cors";


const corsOptions = {
  origin: ["https://typeintern.netlify.app/","http://localhost:3000/"],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration


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