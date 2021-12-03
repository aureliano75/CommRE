const express = require('express'); 
const app = express();
const port = process.env.PORT || 8080; 
const fs = require('fs'); 
const parse = require('csv-parser')

const salesData=[];
let agents={}
fs.createReadStream('./src/data/Sale-Data.csv')
    .pipe(parse())
    .on('data', function(csvrow) {
        salesData.push(csvrow);        
    })
    .on('end',function() {
      agents = parseCsv(salesData)
      console.log(agents)
    });

function parseCsv(csvData) {
  const data = {}
  csvData.map((element) => {
      if (data[element.agent] == null) {
        data[element.agent] = {}
        data[element.agent]["total"] = 0
      }
      if (data[element.agent] != null && data[element.agent][element['property-type']] == null) {
        data[element.agent][element['property-type']] = 0
      }
      if (data[element.agent] != null && data[element.agent][element['property-type']] != null) {
        data[element.agent][element['property-type']] += 1
        data[element.agent]["total"] += 1
      }
  })
  return data
}

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); 

// create a GET route
app.get('/sales', (req, res) => {
  res.send({ agents: agents }); 
}); 