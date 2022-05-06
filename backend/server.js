const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const addvehicleRouter = require('./routes/addvehicle');
const offersRouter = require('./routes/offers');
const faqsRouter = require('./routes/faqs');

app.use('/addvehicle', addvehicleRouter);  
app.use('/offers', offersRouter);
app.use('/faqs', faqsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});