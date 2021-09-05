const express = require("express");
const handlebars = require("express-handlebars")
const config = require("./config/config");
const routes = require("./routes")

const app = express();

const expressConfig = require("./config/express")
expressConfig(app);

app.use(routes);


app.listen(config.PORT, () => console.log(`Server is running on PORT ${config.PORT}...`));