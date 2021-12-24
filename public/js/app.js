const weatherForm = document.querySelector("form");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //display loading untill the values is fetched
  document.getElementById("messageOne").innerHTML = "loading....";
  //if the loaction is canged then clear previous display untill new value is given
  document.querySelector("#messageTwo").textContent = "";

  const loc = document.querySelector("#location").value;

  fetch("/weather?address=" + loc).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        document.getElementById("messageOne").innerHTML = data.error;
      } else {
        document.querySelector("#messageOne").textContent = data.location;
        document.querySelector("#messageTwo").textContent = data.forecastData;
      }
    });
  });
});
