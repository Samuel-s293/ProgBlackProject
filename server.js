const express = require('express')
const app = express()

app.use(express.static('client'));

app.get("/msg", function(req,resp){
    resp.send("well done for clicking")
})

app.listen(8080)