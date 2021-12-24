const geoCode = require("./utils/geocode");
const forecast = require("./utils/weather");

const path = require("path");

const express = require("express");

const hbs = require("hbs");
const { response } = require("express");

const app = express();

const port = process.env.PORT || 3000;

//custom directory for views
const viewspath = path.join(__dirname, "../templates/views");
app.set("views", viewspath);

//is used to display dynamic web pages will look for views folder and search for index file
app.set("view engine", "hbs");

//setup static directory
const publicdirectoryPath = path.join(__dirname, "../public/");

//will display static web pages
app.use(express.static(publicdirectoryPath));

//partial path wich is fixed for every page
const partialPath = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partialPath);

//is used to get the template using handle bars
app.get("", (req, res) => {
  //render is used to render the file in the views "index" is the file name
  res.render("index", {
    title: "Weather App",
    name: "Nikil",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    name: "Nikil",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help message",
    name: "Nikil",
    helptext: "this is the help message",
  });
});

//req.query is used to get the values defined in the URL
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Provide valid location",
    });
  }

  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      } else {
        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({
              error,
            });
          } else {
            res.send({
              location,
              forecastData,
            });
          }
        });
      }
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "provide a valid location",
    });
  } else {
    console.log("search value : ", req.query.search);
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404 page not found",
    message: "Help article not found",
    name: "Nikil",
  });
});
app.get("*", (req, res) => {
  res.render("error", {
    title: "404 page not found",
    message: "page not found",
    name: "Nikil",
  });
});

//is used to run only once

app.listen(port, () => {
  console.log(`Started Server on port ${port}`);
});
