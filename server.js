// Dependencies
var express = require("express");
var bodyParser = require("body-parser");

// Express Configuration
var app = express();
app.use('/assets', express.static('assets'));

// Sets an initial port
var PORT = process.env.PORT || 3030;

// BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Router
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});