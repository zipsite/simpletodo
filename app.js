const express = require("express");
// создаем объект приложения
const app = express();

app.set("view engine", "hbs");

app.use("/access", express.static(__dirname + "/access"));
app.get("/", (inp, out) => {
    out.render("main.hbs");
});

app.listen(3000);