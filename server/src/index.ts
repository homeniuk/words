import express, { Request, Response } from 'express';
import dotenv from "dotenv";
import cors, { CorsOptions } from "cors";

dotenv.config();
const PORT = process.env.PORT||3000;
const corsOptions: CorsOptions = {
  origin: "http://localhost:3000"
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));


app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//npm start
//npm run dev