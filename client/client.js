const form1 = document.getElementById("add-player");
const form2 = document.getElementById("create-team");
const editButton = document.getElementById("edit-button")
const addButton = document.getElementById("add-button")
const form3 = document.getElementById("edit-player");
const errorMessage = document.getElementById("error-message");
const modal1 = new bootstrap.Modal(document.getElementById('addPlayerModal'));
const modal2 = new bootstrap.Modal(document.getElementById('createTeamModal'));
const modal3 = new bootstrap.Modal(document.getElementById('editPlayerModal'));

function serverDisconnectedMessage() {
    const errMessage = bootstrap.Toast.getOrCreateInstance(errorMessage)
    errMessage.show()

    setTimeout(() => {
        errMessage.hide();
    }, 10000);
}

form1.addEventListener("submit", async function (event) {
    event.preventDefault();
    const formData = new FormData(form1);
    const formJSON = JSON.stringify(Object.fromEntries(formData.entries()));
    console.log("Form data", formJSON);
    try{
        const response = await fetch("/api/player/add",{
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: formJSON

        
        })

        if (response.ok){
            modal1.hide();
            form1.reset();
            loadPlayerTable()
            loadTeams()
            editButtonVisibility()
        }
        console.log("ERROR", response)

    }
    catch (error) {
        serverDisconnectedMessage()
    }

})

form2.addEventListener("submit", async function (event) {
    event.preventDefault();
    const formData = new FormData(form2);
    const formJSON = JSON.stringify(Object.fromEntries(formData.entries()));
    console.log("Form data", formJSON);
    try{
        const response = await fetch("/api/team/create",{
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: formJSON
        })

        if (response.ok){
            modal2.hide();
            form2.reset();
            loadTeams()
            addButtonVisibility()
        }
        console.log("ERROR", response)
    }
    catch (error) {
        serverDisconnectedMessage()
    }


})

editButton.addEventListener("click", function (){
    try {
        fetch("/api/players")
            .then(response => response.json())
            .then(players => {
                const name = document.getElementById("player-name-edit")
                const goalsScored = document.getElementById("goalsScored-edit")
                const assists = document.getElementById("assists-edit")
                const cleanSheets = document.getElementById("cleanSheets-edit")
                

                players.forEach(player => {
                    const playerTab = document.getElementById(`p${player.id}`)
                    if (playerTab.classList == "list-group-item list-group-item-action active") {
                        name.value = `${player.name}`
                        goalsScored.value = `${player.goalsScored}`
                        assists.value = `${player.assists}`
                        cleanSheets.value = `${player.cleanSheets}`
                        const positionOption = document.getElementById(`position-${player.position}-edit`)
                        positionOption.checked = true
                        const teamOption = document.getElementById(`team${player.team}-edit`)
                        teamOption.checked = true
                    }
                })
            })
    }
    catch (error) {
        serverDisconnectedMessage()
    }
})

form3.addEventListener("submit", async function (event) {
    event.preventDefault();
    const formData = new FormData(form3);
    let data = Object.fromEntries(formData.entries())
    try{
        await fetch("/api/players")
            .then(response => response.json())
            .then(players => {

                players.forEach(player => {
                    const playerTab = document.getElementById(`p${player.id}`)
                    if (playerTab.classList == "list-group-item list-group-item-action active") {
                        data.id = player.id
                    }
                })
            })

        
            const formJSON = JSON.stringify(data);
            console.log("Form data", formJSON);
            const response = await fetch("/api/player/edit",{
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: formJSON
                })


            if (response.ok){
                modal3.hide();
                form3.reset();
                loadPlayerTable()
                loadTeams()
            }
            console.log("ERROR", response)
    }
    catch (error) {
        serverDisconnectedMessage()
    }


})


function loadPlayerTable() {
    try{
        fetch("/api/players")
            .then(response => response.json())
            .then(players => {
                const listGroup = document.getElementById("list-players");
                const tabContent = document.getElementById("tabContent-players");

                listGroup.innerHTML = ""
                tabContent.innerHTML = ""

                players.forEach(player => {
                    // Create list item for the player
                    const listItem = document.createElement("a");
                    listItem.classList.add("list-group-item", "list-group-item-action");
                    listItem.id = `p${player.id}`;
                    listItem.setAttribute("data-bs-toggle", "list");
                    listItem.href = `#p${player.id}-tab`;
                    listItem.role = "tab";
                    listItem.textContent = player.name;

                    // Create tab pane for the player
                    const tabPane = document.createElement("div");
                    tabPane.classList.add("tab-pane", "fade");
                    tabPane.id = `p${player.id}-tab`;
                    tabPane.role = "tabpanel";
                    tabPane.innerHTML = `<h3>${player.name}</h3><p>Position: ${player.position}</p><p>Goals Scored: ${player.goalsScored}</p><p>Assists: ${player.assists}</p><p>Clean Sheets: ${player.cleanSheets}</p>`;

                    let index = players.indexOf(player)
                    if (index == 0) {
                        listItem.classList.add("active")
                        tabPane.classList.add("show")
                        tabPane.classList.add("active")
                        
                    }

                    // Append elements to the page
                    listGroup.appendChild(listItem);
                    tabContent.appendChild(tabPane);

                    

                });
            })
    }
    
    catch (error) {
        serverDisconnectedMessage()
    }
}

function loadTeams() {
    try{
        fetch("/api/teams")
        .then(response => response.json())
        .then(teams => {
            const listGroup = document.getElementById("list-teams");
            const tabContent = document.getElementById("tabContent-teams");
            const teamSelection = document.getElementById("teamSelection")
            const teamSelectionEdit = document.getElementById("teamSelection-edit")

            listGroup.innerHTML = ""
            tabContent.innerHTML = ""
            teamSelection.innerHTML = ""
            teamSelectionEdit.innerHTML = ""

            teamNames = Object.keys(teams)
            numOfTeams = teamNames.length
            console.log(teamNames)

            for (let i=0 ; i<numOfTeams; i++){
                // Create list item for the team
                const listItem = document.createElement("a");
                listItem.classList.add("list-group-item", "list-group-item-action");
                listItem.id = `t${i}`;
                listItem.setAttribute("data-bs-toggle", "list");
                listItem.href = `#t${i}-tab`;
                listItem.role = "tab";
                listItem.textContent = teamNames[i];

                // Create tab pane for the team
                const tabPane = document.createElement("div");
                tabPane.classList.add("tab-pane", "fade");
                tabPane.id = `t${i}-tab`;
                tabPane.role = "tabpanel";
                console.log(teams[teamNames[i]])
                let players = ``
                teams[teamNames[i]].forEach(player => {
                    players = players.concat(`<p>- ${player}</p>`)
                })
                tabPane.innerHTML = `<h3>${teamNames[i]}</h3><div>${players}</div>`;

                // Append elements to the page
                listGroup.appendChild(listItem);
                tabContent.appendChild(tabPane);

                const option = document.createElement("div")
                option.innerHTML = `<label for="team">${teamNames[i]}</label><input type="radio" id="team${teamNames[i]}" name="team" value="${teamNames[i]}">`

                teamSelection.appendChild(option)

                const optionEdit = document.createElement("div")
                optionEdit.innerHTML = `<label for="team">${teamNames[i]}</label><input type="radio" id="team${teamNames[i]}-edit" name="team" value="${teamNames[i]}">`

                teamSelectionEdit.appendChild(optionEdit);
            };
        })
    }
    
    catch (error) {
        serverDisconnectedMessage()
    }
}


function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function editButtonVisibility() {
    try{
        fetch("/api/players")
            .then(response => response.json())
            .then(players => {
                if (players.length == 0){
                    editButton.style.display = "none";
                }
                else {
                    editButton.style.display = "block";
                }
            })
    }
    catch (error) {
        serverDisconnectedMessage()
    }
}

function addButtonVisibility() {
    try{
        fetch("/api/teams")
            .then(response => response.json())
            .then(teams => {
                console.log(Object.keys(teams).length)
                if (Object.keys(teams).length == 0){
                    addButton.style.display = "none";
                }
                else {
                    addButton.style.display = "block";
                }
            })
    }
    catch (error) {
        serverDisconnectedMessage()
    }
    
}

document.addEventListener("DOMContentLoaded", editButtonVisibility());
document.addEventListener("DOMContentLoaded", addButtonVisibility());
document.addEventListener("DOMContentLoaded", loadPlayerTable());
document.addEventListener("DOMContentLoaded", loadTeams());