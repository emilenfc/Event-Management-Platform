import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import router from './router';

dotenv.config();


const app = express();
app.use(cors(
    {
        credentials: true
    }
));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8000, () => {
    console.log('Server listening on port 8000');
});

const MONGO_ULR = process.env.MONGO_ULR
console.log(MONGO_ULR)
mongoose.connect(MONGO_ULR).then(() => {
    console.log('DB connected');
}).catch((error) => {
    console.log("Error while connection to database",error);
})

app.use('/', router());