import express, { Request, Response } from 'express';
import 'dotenv/config';
import cors, { CorsOptions } from "cors";
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import router from './router';

const PORT = process.env.PORT;
const DB_URL = String(process.env.DB_URL);


const corsOptions: CorsOptions = {
  credentials: true,
  origin: "http://localhost:3000"
};

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use('/', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

/*app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});*/

const start = async () => {
  try {
    if (DB_URL === "")
      throw "DB_URL is empty";
    await mongoose.connect(DB_URL)
    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
  } catch (e) {
      console.log(e);
  }
}

start()
//cd server
//npm run dev