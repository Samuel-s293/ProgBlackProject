const express = require('express')
const app = express()

app.use(express.static('client'));

app.get("/p1", function(req,resp){
    resp.send("Samuel Singleton")
})

app.listen(8080)