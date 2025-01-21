const express = require('express')
const app = express()
const fs = require("fs")
app.use(express.json());

app.use(express.static('client'));


app.post("/api/player/add",  function(req, resp){

    let items = [];
    if (fs.existsSync("./players.json")) {
        let data = fs.readFileSync("./players.json", "utf8");
        if (data) {
            items = JSON.parse(data);
        }
    }

    let itemName = req.body.name;
    let id = items.length + 1;

    let newItem = {"id" : id, "name" : itemName, "goalsScored": req.body.goalsScored};
    console.log("New Item Added:");
    console.log(newItem);

    items.push(newItem);
    let itemsText = JSON.stringify(items);
    fs.writeFileSync("./players.json", itemsText);

    resp.sendStatus(200)
})


app.get("/api/players", (req, res) => {
    fs.readFile("./players.json", "utf8", (err, data) => {
        if (err) {
            res.status(500).json({ error: "Failed to load player data" });
            return;
        }
        res.json(JSON.parse(data));
    });
});


app.listen(8080)