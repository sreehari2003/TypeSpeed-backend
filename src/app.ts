import express,{Request,Response,NextFunction} from 'express';
const app = express();
import morgan from "morgan";
import cors from "cors";
import appError from "./utils/AppError";


const corsOptions = {
  // origin: ["https://typeintern.netlify.app/","http://localhost:4000/","https://typespeednext.herokuapp.com/"],
  origin:"*",
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




app.all("*", (req, res, next) => {
  next(
    new appError(`The requested page ${req.originalUrl} was not found`,404));
});


app.use((err, req:Request, res:Response, next:NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

export default app;
