const express = require('express'); 
const app = express();
const port = process.env.PORT || 8080; 
const fs = require('fs'); 
const parse = require('csv-parser')

const salesData=[];
fs.createReadStream('./src/data/Sale-Data.csv')
    .pipe(parse())
    .on('data', function(csvrow) {
        salesData.push(csvrow);        
    })
    .on('end',function() {

    });


// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); 

// create a GET route
app.get('/sales', (req, res) => {
  res.send({ salesData: salesData }); 
}); 