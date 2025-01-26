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

    let id = items.length + 1;


    let newItem = {"id" : id, "name": req.body.name, "team": req.body.team, "goalsScored": req.body.goalsScored};
    console.log("New Player Added:");
    console.log(newItem);

    items.push(newItem);
    let itemsText = JSON.stringify(items);
    fs.writeFileSync("./players.json", itemsText);

    resp.sendStatus(200)
})



app.post("/api/player/edit",  function(req, resp){

    let players = [];
    if (fs.existsSync("./players.json")) {
        let data = fs.readFileSync("./players.json", "utf8");
        if (data) {
            players = JSON.parse(data);
        }
    }

    let editedItem = {"id" : req.body.id, "name": req.body.name, "team": req.body.team, "goalsScored": req.body.goalsScored};
    console.log("Player Edited:");
    console.log(editedItem);


    let count = 0
    players.forEach (player =>{
        if (player.id == req.body.id){
            players[count] = editedItem
            console.log(players)
        }
        count= count+1
    })
    let playersText = JSON.stringify(players);
    fs.writeFileSync("./players.json", playersText);

    resp.sendStatus(200)
})


app.post("/api/team/create",  function(req, resp){

    let items = [];
    if (fs.existsSync("./teams.json")) {
        let data = fs.readFileSync("./teams.json", "utf8");
        if (data) {
            items = JSON.parse(data);

        }
        else {
            items = {}
        }
    }

    items[`${req.body.name}`]=[];
    console.log("New Team Added:");
    console.log(req.body.name);
    let itemsText = JSON.stringify(items);
    fs.writeFileSync("./teams.json", itemsText);

    resp.sendStatus(200)
})

app.get("/api/players", (req, res) => {
    fs.readFile("./players.json", "utf8", (err, data) => {
        if (err) {
            res.status(500).json({ error: "Failed to load player data" });
            return;
        }
        if (data) {
            res.json(JSON.parse(data));
        }
        else {
            res.json([])
        }
    });
});

app.get("/api/teams", (req, res) => {
    fs.readFile("./players.json", "utf8", (err, data) => {
        if (err) {
            res.status(500).json({ error: "Failed to load team data" });
            return;
        }
        if (fs.existsSync("./teams.json")) {
            let data2 = fs.readFileSync("./teams.json", "utf8");
            if (data2) {
                teamData = JSON.parse(data2);
                teamNames = Object.keys(teamData)
                numOfTeams = teamNames.length
                for (let i=0 ; i<numOfTeams; i++){
                    team = teamNames[i]
                    teamData[team] = []
                }
    
            }
        }
        if (data) {
            playerData = JSON.parse(data)
            playerData.forEach(player => {
                teamData[`${player.team}`].push(player.name)
            
            let itemsText = JSON.stringify(teamData);
            fs.writeFileSync("./teams.json", itemsText);
            });
            res.json(teamData);
        }
        else {
            res.json({})
        }
        
    });
});


app.listen(8080)