function getvisitor(){
var xhr = new XMLHttpRequest();
var url = 'https://midsoune-b5be75a7ee15.herokuapp.com/visits';
xhr.onloadend = function(){
data = JSON.parse(this.responseText);
document.getElementById("visitor").textContent = data.value
 };
xhr.open("GET", url, true);
xhr.send();
}
