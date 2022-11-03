
// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
// cors is the package that allow browser and server to talk with each other without any security interruptions
const cors = require('cors');
app.use(cors());
// initialize the main project folder
//This line of code connects our server-side code (the code in the server.js file) to our client-side code 
app.use(express.static('demo'))

const port = 8000;
const server = app.listen(port,listening);

function listening(){
    console.log("server is running");
    console.log(`server running on port ${port}`);
};