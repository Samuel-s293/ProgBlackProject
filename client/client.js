button = document.getElementById("p1")

button.addEventListener('click', function(event){
   fetch('http://127.0.0.1:8080/p1')
    .then(response => response.text())
    .then(body => document.getElementById('p1-tab').innerHTML=body)
    .catch((error)=> this.alert(error))
 });


