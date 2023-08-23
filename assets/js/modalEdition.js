// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementsByClassName("edition-button-edition")[0];

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
  span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
document.addEventListener('keydown', (event) => {
  if ( modal.style.display == "block"){
    var name = event.key;
    var code = event.code;
    if ((event.key == "Escape")||(event.key == "Esc")){modal.style.display = "none";}
     if (event.key == "Tab"){event.preventDefault();}
     //Alert the key name and key code on keydown
     //alert(`Key pressed ${name} \r\n Key code value: ${code}`);
  };
}, false);