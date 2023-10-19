import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { PORT, mongoDBURL } from "../backend/config.js"
import { Book } from "../backend/models/bookModel.js";
import booksRoute from '../backend/routes/booksRoute.js';
const app = express();

// middle ware for parsing request body
// what is middle ware really ?
app.use(express.json());

// middleware for handling CORS policy
//  Option 1: Allow all origins with default of cors(*)
// -- not advisable as it accepts every request
app.use(cors()); 
// Option 2: Allow custom origins
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// )

app.get('/', (request, response) => {
    console.log(request);
    return response.status(200).send(`Welcome to MERN tutorial!`)
})

//another middleware - ensure to understand the purpose of this
app.use('/books', booksRoute);

mongoose.connect(mongoDBURL).then(
() => {
    console.log(`Connected to mongoDB database`);
    app.listen(PORT, () => {
        console.log(`Listening on ${PORT}`);
    })
}).catch(
    () => {
        console.log(`Failed to connect to mongoDB`)
})