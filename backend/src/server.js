import express from 'express'; 
import mongoose from 'mongoose';
import routes from './routes/index.js';
import cors from 'cors';
//should be called before mongo.connect
import dotenv from 'dotenv';
import { dataInit } from './upload.js'
dotenv.config();

const app = express(); 
const port = process.env.PORT || 4000; 

app.use(cors());
app.use(express.json());
app.use('/', routes);

function connectMongo() {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    
    const db = mongoose.connection;
    
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('mongo connected!');
    });
}

connectMongo();
dataInit();



app.listen(port, () =>   
    console.log(`info-exchanging app listening on port ${port}!`), );