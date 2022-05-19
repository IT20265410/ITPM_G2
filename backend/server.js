const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 4800;

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
const registerRouter = require('./routes/register');
const aboutUsRouter = require('./routes/aboutUs');
const teamRouter = require('./routes/team');
const rentvRouter = require('./routes/rentv');
const customersRouter = require('./routes/customers');
const contactsRouter = require('./routes/contacts');


app.use('/addvehicle', addvehicleRouter);  
app.use('/offers', offersRouter);
app.use('/faqs', faqsRouter);
app.use('/register', registerRouter); 
app.use('/aboutUs', aboutUsRouter);
app.use('/team', teamRouter);
app.use('/rentv', rentvRouter);  
app.use('/customers', customersRouter);
app.use('/contacts', contactsRouter);  

app.use('/users', require('./routes/auth'));

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});