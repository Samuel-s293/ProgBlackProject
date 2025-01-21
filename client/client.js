const form = document.getElementById("add-item");
const modal = new bootstrap.Modal(document.getElementById('addItemModal'));
form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const formData = new FormData(form);
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

    if (response.ok){
        modal.hide();
        form.reset();
    }
    console.log("ERROR", response)

})

function loadPlayerTable() {
    fetch("/api/players")
        .then(response => response.json())
        .then(players => {
            const listGroup = document.getElementById("list-tab");
            const tabContent = document.getElementById("nav-tabContent");

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

document.addEventListener("DOMContentLoaded", loadPlayerTable());