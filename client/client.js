const form1 = document.getElementById("add-player");
const form2 = document.getElementById("create-team");
const modal1 = new bootstrap.Modal(document.getElementById('addPlayerModal'));
const modal2 = new bootstrap.Modal(document.getElementById('createTeamModal'));

form1.addEventListener("submit", async function (event) {
    event.preventDefault();
    const formData = new FormData(form1);
    const formJSON = JSON.stringify(Object.fromEntries(formData.entries()));
    console.log("Form data", formJSON);
    const response = await fetch("/api/player/add",{
        method: "post",
        headers: {
            "Content-Type": "application/json"
          },
        body: formJSON
    })

    loadPlayerTable()
    loadTeams()

    if (response.ok){
        modal1.hide();
        form1.reset();
    }
    console.log("ERROR", response)

})

form2.addEventListener("submit", async function (event) {
    event.preventDefault();
    const formData = new FormData(form2);
    const formJSON = JSON.stringify(Object.fromEntries(formData.entries()));
    console.log("Form data", formJSON);
    const response = await fetch("/api/team/create",{
        method: "post",
        headers: {
            "Content-Type": "application/json"
          },
        body: formJSON
    })

    loadTeams()

    if (response.ok){
        modal2.hide();
        form2.reset();
    }
    console.log("ERROR", response)

})


function loadPlayerTable() {
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
                tabPane.innerHTML = `<h3>${player.name}</h3><p>Goals Scored: ${player.goalsScored}</p>`;

                // Append elements to the page
                listGroup.appendChild(listItem);
                tabContent.appendChild(tabPane);

                

            });
        })
        .catch(error => console.error("Error loading players:", error));
}

function loadTeams() {
    fetch("/api/teams")
        .then(response => response.json())
        .then(teams => {
            const listGroup = document.getElementById("list-teams");
            const tabContent = document.getElementById("tabContent-teams");
            const teamSelection = document.getElementById("teamSelection")

            listGroup.innerHTML = ""
            tabContent.innerHTML = ""
            teamSelection.innerHTML = ""

            teamNames = Object.keys(teams)
            numOfTeams = teamNames.length

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
                tabPane.innerHTML = `<h3>${teamNames[i]}</h3><p>${teams[teamNames[i]]}</p>`;

                // Append elements to the page
                listGroup.appendChild(listItem);
                tabContent.appendChild(tabPane);

                const option = document.createElement("div")
                option.innerHTML = `<label for="team">${teamNames[i]}</label><input type="radio" id="team${teamNames[i]}" name="team" value="${teamNames[i]}">`

                teamSelection.appendChild(option)
                

            };
        })
        .catch(error => console.error("Error loading players:", error));
}

document.addEventListener("DOMContentLoaded", loadPlayerTable());
document.addEventListener("DOMContentLoaded", loadTeams());