class UI {
  static selfis = this;


  checkKey(e) {
    e = e || window.event;
    if (e.keyCode == "37") {
      previousPerson();
    } else if (e.keyCode == "39") {
      nextPerson();
    }
  }

  async getAllPeople() {
    let response = await fetch("/api/people");
    let people = await response.json();
    for (let per of people) {
      console.log(per);
      peopleArr.push(new Person(per.firstName, per.lastName, per.pictureUrl, per.lookingFor, per.id));
    }
    console.log("PEOPLE: AAAa");
    console.log(people);
    console.log(peopleArr);
  }

  getLikedIds() {
    if (localStorage.getItem("likedIds") === null) {
      likedIds = [];
    } else if (Array.isArray(localStorage.getItem("likedIds"))) {
      console.log("IN ELSE IFFFF");
      likedIds = JSON.parse(localStorage.getItem("likedIds"));
    } else {
      console.log(localStorage.getItem("likedIds"));
      likedIds = JSON.parse(localStorage.getItem("likedIds"));
    }
  }


  displayPerson(next) {
    if (!showLikedOnly) {
      heart.style.display = "inherit";
      console.log("IN DISPLAY:::::::::::::::: " + next);
      if (next === false) {
        i--;
      } else {
        i++;
      }
      console.log(i);
      console.log("DUPA");
      console.log(image.src);

      if (i < 0) {
        heart.style.display = "none";
        i = -1;
        console.log(i);
        person.innerHTML = "You have reached the beginning";
        document.getElementById("img-main").src =
          "https://source.unsplash.com/400x400/?random";
      } else if (i >= peopleArr.length) {
        heart.style.display = "none";
        document.getElementById("img-main").src =
          "https://source.unsplash.com/400x400/?random";
        person.innerHTML = "You have reached the end";
        i = peopleArr.length;
        console.log("END");
      } else {
        document.getElementById("img-main").src = peopleArr[i].pictureUrl;
        console.log("ELSE");
        person.innerHTML = `
          First Name: ${peopleArr[i].firstName} <br> 
          Last Name: ${peopleArr[i].lastName} <br>
          Looking for: ${peopleArr[i].lookingFor} <br>
          ID: ${peopleArr[i].id} <br>
          `;
      }
      return i;
    } else {
      console.log("IN LIKED PEOPLE, iterator: " + likedIds);

      let likedPerson = null;

      console.log("peopleArr.length: " + peopleArr.length);

      for (let person of peopleArr) {
        console.log("IN LOOP");
        if (person.id === likedIds[likedIterator]) {
          likedPerson = person;
          break;
        }
      }

      heart.style.display = "none";
      console.log("IN DISPLAY:::::::::::::::: " + next);
      if (next === false) {
        likedIterator--;
      } else {
        likedIterator++;
      }

      if (likedIterator < 0) {
        heart.style.display = "none";
        likedIterator = -1;
        console.log(likedIterator);
        person.innerHTML = "You have reached the beginning";
        document.getElementById("img-main").src =
          "https://source.unsplash.com/400x400/?random";
      } else if (likedIterator > likedIds.length) {
        heart.style.display = "none";
        document.getElementById("img-main").src =
          "https://source.unsplash.com/400x400/?random";
        person.innerHTML = "You have reached the end";
        likedIterator = likedIds.length;
        console.log("END");
      } else {
        if (likedPerson === null) {
          console.log("UNDEFINED");
          if (next) nextPerson();
          else previousPerson();
        } else {
          document.getElementById("img-main").src = likedPerson.pictureUrl;
          console.log("ELSE");
          person.innerHTML = `
                First Name: ${likedPerson.firstName} <br> 
                Last Name: ${likedPerson.lastName} <br>
                Looking for: ${likedPerson.lookingFor} <br>
                ID: ${likedPerson.id} <br>
                `;
        }
      }
    }
  }



  changeHeart(e) {
    if (i >= 0) {
      console.log(i);
      let id = peopleArr[i].id;
      console.log(id);
      if (localStorage.getItem("likedIds") === null) {
        likedIds = [];
      } else if (Array.isArray(localStorage.getItem("likedIds"))) {
        console.log("IN ELSE IFFFF");
        likedIds = JSON.parse(localStorage.getItem("likedIds"));
      } else {
        console.log(localStorage.getItem("likedIds"));
        likedIds = JSON.parse(localStorage.getItem("likedIds"));
      }
      console.log(likedIds);

      if (heart.classList.contains("far")) {
        //far - empty
        heart.classList.remove("far");
        heart.classList.add("fas");
        likedIds.push(id);
      } else {
        heart.classList.remove("fas");
        heart.classList.add("far");
        for (let j = likedIds.length - 1; j >= 0; j--) {
          if (likedIds[j] === id) {
            console.log(likedIds);
            likedIds.splice(j, 1);
          }
        }
      }
      localStorage.setItem("likedIds", JSON.stringify(likedIds));
    }
  }

  checkHeart() {
    if (i >= 0 && i < peopleArr.length) {
      if (localStorage.getItem("likedIds") !== null) {
        if (localStorage.getItem("likedIds").includes(peopleArr[i].id)) {
          if (heart.classList.contains("far")) {
            //far - empty
            heart.classList.remove("far");
            heart.classList.add("fas");
          }
        } else {
          if (heart.classList.contains("fas")) {
            heart.classList.remove("fas");
            heart.classList.add("far");
          }
        }
      }
    }
  }





}