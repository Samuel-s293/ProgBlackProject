button = document.getElementById("p1")

button.addEventListener('click', async function(event){
   fetch('http://127.0.0.1:8080/p1')
    .then(response => response.text())
    .then(body => document.getElementById('p1-tab').innerHTML=body)
    .catch((error)=> this.alert(error))
 });


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
    if (response.ok){
        modal.hide();
        form.reset();
    }
    console.log("SKIB", response)
})