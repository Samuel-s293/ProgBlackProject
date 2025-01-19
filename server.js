const express = require('express')
const app = express()
const fs = require("fs")
app.use(express.json());

app.use(express.static('client'));
const utils = require('./node_modules/utils');


app.post("/api/player/add", async function(req, resp){

    let items = [];
    if (fs.existsSync("./players.json")) {
        let data = fs.readFileSync("./players.json", "utf8");
        if (data) {
            items = JSON.parse(data);
        }
    }

    let itemName = req.body.name;
    let id = items.length;

    let newItem = {"id" : id, "name" : itemName, "goalsScored": req.body.goalsScored};
    console.log("New Item Added:");
    console.log(newItem);

    items.push(newItem);
    let itemsText = JSON.stringify(items);
    fs.writeFileSync("./players.json", itemsText);

    resp.sendStatus(200)
})

app.get("/p1", async function(req,resp){
    resp.send("Samuel Singleton")
})


app.listen(8080)