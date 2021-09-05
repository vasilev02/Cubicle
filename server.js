const express = require("express");
const handlebars = require("express-handlebars")
const config = require("./config/config");

const app = express();

const expressConfig = require("./config/express")
expressConfig(app);


app.get("/", (req, res) => {
    res.render('home', {layout: false});
});


app.listen(config.PORT, () => console.log(`Server is running on PORT ${config.PORT}...`));