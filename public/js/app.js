// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

// fetch("http://localhost:3000/weather?address=bangalore").then((resposne) => {
//   resposne
//     .json()
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((error) => {
//       console.log("Error: ", error);
//     });
// });

// fetch("http://localhost:3000/weather?address=bangalore").then((response) => {
//   response.json().then((data) => {
//     if (data.error) {
//       console.log(data.error);
//     } else {
//       console.log(data.location);
//     }
//   });
// });

const weatherForm = document.querySelector("form");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("messageOne").innerHTML = "loading....";
  document.querySelector("#messageTwo").textContent = "";

  const loc = document.querySelector("#location").value;
  fetch("http://localhost:3000/weather?address=" + loc).then((response) => {
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
