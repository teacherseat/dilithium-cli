const express = require('express')
const app = express()
const port = 8080
const path = require('path')

app.use(express.static(path.join(__dirname,'public')))

app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname,'public','index.html'));
});

//app.get('/api', function(req, res){
  //res.json({})
//})

app.listen(port)

console.log(`Web Server running on:`)
console.log(`http://localhost:${port}`)

