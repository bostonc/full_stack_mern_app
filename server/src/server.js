import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { getSlots, addSlot, updateSlot, deleteSlot } from './controllers/slot.controller.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());

console.log('Attepting to connect to MongoDB at', process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Database connection established!');
});

// Define routes here
app.get("/test", (req, res) => {
    console.log('GET /test', req.route, req.body);
    res.send("Server is running");
});

app.get('/', getSlots);
app.post('/', addSlot);
app.patch('/:id', updateSlot);
app.delete('/:id', deleteSlot);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});