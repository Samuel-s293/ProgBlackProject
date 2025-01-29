const express = require('express');
const app = express();
const fs = require("fs");
app.use(express.json());

app.use(express.static('client'));

app.post("/api/player/add", function(req, resp) {
    let fields = ["name", "team", "goalsScored", "position", "assists", "cleanSheets"];
    let erroneousField = false;
    
    fields.forEach(field => {
        if (req.body[field] === "" || req.body[field] === undefined) {
            erroneousField = true;
        }
    if (Number(req.body["goalsScored"]) < 0 || Number(req.body["assists"]) < 0 || Number(req.body["cleanSheets"]) < 0 || 
        Number(req.body["goalsScored"]) % 1 !== 0 || Number(req.body["assists"]) % 1 !== 0 || Number(req.body["cleanSheets"]) % 1 !== 0) {
        erroneousField = true;
    }
    });

    if (!erroneousField) {
        let players = [];
        if (fs.existsSync("./players.json")) {
            let data = fs.readFileSync("./players.json", "utf8");
            if (data) {
                players = JSON.parse(data);
            }
        }

        let id = 1;
        if (players.length > 0) {
            let last_player = players[players.length - 1];
            id = last_player["id"] + 1;
        }

        let newPlayer = {"id": id, "name": req.body.name, "team": req.body.team, "goalsScored": req.body.goalsScored, "position": req.body.position, "assists": req.body.assists, "cleanSheets": req.body.cleanSheets};
        console.log("New Player Added:");
        console.log(newPlayer);

        players.push(newPlayer);
        let playersText = JSON.stringify(players);
        fs.writeFileSync("./players.json", playersText);

        let teams = {};
        if (fs.existsSync("./teams.json")) {
            let data = fs.readFileSync("./teams.json", "utf8");
            if (data) {
                teams = JSON.parse(data);
            }
        }

        teams[req.body.team].push(req.body.name);
        let teamsText = JSON.stringify(teams);
        fs.writeFileSync("./teams.json", teamsText);

        resp.sendStatus(200);
    } else {
        resp.sendStatus(400);
    }
});

app.post("/api/player/edit", function(req, resp) {
    let fields = ["name", "team", "goalsScored", "position", "assists", "cleanSheets"];
    let erroneousField = false;
    
    fields.forEach(field => {
        if (req.body[field] === "" || req.body[field] === undefined) {
            erroneousField = true;
        }
    if (Number(req.body["goalsScored"]) < 0 || Number(req.body["assists"]) < 0 || Number(req.body["cleanSheets"]) < 0 || Number(req.body["goalsScored"]) % 1 !== 0 || Number(req.body["assists"]) % 1 !== 0 || Number(req.body["cleanSheets"]) % 1 !== 0) {
        erroneousField = true;
    }
    });

    if (!erroneousField) {
        let players = [];
        if (fs.existsSync("./players.json")) {
            let data = fs.readFileSync("./players.json", "utf8");
            if (data) {
                players = JSON.parse(data);
            }
        }

        let editedPlayer = {"id": req.body.id, "name": req.body.name, "team": req.body.team, "goalsScored": req.body.goalsScored, "position": req.body.position, "assists": req.body.assists, "cleanSheets": req.body.cleanSheets};
        console.log("Player Edited:");
        console.log(editedPlayer);

        let count = 0;
        let old_team = "";
        players.forEach(player => {
            if (player.id === req.body.id) {
                old_team = player.team;
                players[count] = editedPlayer;
            }
            count++;
        });

        let playersText = JSON.stringify(players);
        fs.writeFileSync("./players.json", playersText);

        let teams = {};
        if (fs.existsSync("./teams.json")) {
            let data2 = fs.readFileSync("./teams.json", "utf8");
            if (data2) {
                teams = JSON.parse(data2);
            }
        }

        let index = teams[old_team].indexOf(req.body.name);
        teams[old_team].splice(index, 1);
        teams[req.body.team].push(req.body.name);
        let teamsText = JSON.stringify(teams);
        fs.writeFileSync("./teams.json", teamsText);

        resp.sendStatus(200);
    } else {
        resp.sendStatus(400);
    }
});

app.post("/api/team/create", function(req, resp) {
    let teams = {};
    if (fs.existsSync("./teams.json")) {
        let data = fs.readFileSync("./teams.json", "utf8");
        if (data) {
            teams = JSON.parse(data);
        }
    }

    if (req.body.name !== "") {
        teams[req.body.name] = [];
        console.log("New Team Added:");
        console.log(req.body.name);
        let teamsText = JSON.stringify(teams);
        fs.writeFileSync("./teams.json", teamsText);

        resp.sendStatus(200);
    } else {
        resp.sendStatus(400);
    }
});

app.get("/api/players", (req, resp) => {
    fs.readFile("./players.json", "utf8", (err, data) => {
        if (err) {
            resp.status(500).json({ error: "Failed to load player data" });
            return;
        }
        if (data) {
            resp.json(JSON.parse(data));
        } else {
            resp.json([]);
        }
    });
});

app.get("/api/teams", (req, resp) => {
    fs.readFile("./teams.json", "utf8", (err, data) => {
        if (err) {
            resp.status(500).json({ error: "Failed to load team data" });
            return;
        }
        if (data) {
            resp.json(JSON.parse(data));
        } else {
            resp.json({});
        }
    });
});

module.exports = app;
