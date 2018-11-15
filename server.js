var express = require("express");

var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlendoded({extended: true}));
app.use(express.text());
app.use(expree.json({type: "application/vnd.api+json"}));
app.use(express.static(__dirname + "/app/public"));

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});