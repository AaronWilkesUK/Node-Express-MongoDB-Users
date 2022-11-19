import express from 'express';
import bodyParser from 'body-parser';
import { connectToDB } from './mongodb.js';
import userRoutes from './routes/users.js';

const app = express();
const PORT = 5000;

//Create a local instance of MongoDB
const dbURI = "mongodb://127.0.0.1:27017/Users";
connectToDB(dbURI, (err) => {
    if(!err) {
        app.listen(PORT, () => {
            console.log("Server running on port ", PORT);
        })
    }
})

app.use(bodyParser.json());

app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send("Try looking under /users");
})