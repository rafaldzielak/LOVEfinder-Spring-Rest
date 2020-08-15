let ui = new UI();
let person = document.getElementById("person");
let image = document.getElementById("img-main");
let heart = document.querySelector(".fa-heart");
let deleteOneInput = document.querySelector(".delete-one");
let formDeleteOne = document.getElementById("delete-one-form");
let showLiked = document.querySelector(".show-liked");

let likedIds = [];
let showLikedOnly = false;
let likedIterator = 0;
let peopleArr = [];
ui.getLikedIds();
ui.getAllPeople();

document.onkeydown = ui.checkKey;
document.getElementById("next-btn").addEventListener("click", ui.checkHeart);
document.getElementById("previous-btn").addEventListener("click", ui.checkHeart);


document.getElementById("next-btn").addEventListener("click", nextPerson);
document.getElementById("previous-btn").addEventListener("click", previousPerson);


function previousPerson() {
  ui.displayPerson(false);
  console.log("previous person");
}

function nextPerson() {
  console.log("next person");
  ui.displayPerson(true);
}

formDeleteOne.addEventListener("click", () => {
  formDeleteOne.action = `/deleteperson/${peopleArr[i].id}`;
  deleteOneInput.value = i;
  console.log(deleteOneInput.value);
  console.log(formDeleteOne.action);
});


showLiked.addEventListener("click", () => {
  if (!showLikedOnly) {
    showLikedOnly = true;
    showLiked.textContent = "Show All";
  } else {
    showLikedOnly = false;
    showLiked.textContent = "Show Liked";
  }
  nextPerson();
});


heart.addEventListener("click", ui.changeHeart);
console.log("heart");
console.log(heart);