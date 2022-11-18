const express = require("express");
const hbs = require("hbs");
let bodyParser = require('body-parser');
const fs = require("fs");

const app = express();
let jsonParser = bodyParser.json();
hbs.registerPartials(__dirname + "/views/partials");


app.set("view engine", "hbs");

hbs.registerHelper("get-non-complete-task", () => {
    let result = '';
    let jsonTask = JSON.parse(fs.readFileSync("db.json", "utf8"));
    for (let elem of jsonTask) {
        if (elem.check == false) {
            result += `<div id="${elem.id}" class="elem-list">
                        <div class="checkbox false">
                            <img src="/access/icon/icon-uncheck.png" alt="" class="icon">
                        </div>
                        <p class="elem-text">${elem.text}</p>
                        <div class="remove">
                            <img src="/access/icon/icon-del.png" alt="" class="icon">
                        </div>
                    </div>`;
        }

    }
    return new hbs.SafeString(result);
});

hbs.registerHelper("get-complete-task", () => {
    let result = '';
    let jsonTask = JSON.parse(fs.readFileSync("db.json", "utf8"));
    for (let elem of jsonTask) {
        if (elem.check == true) {
            result += `<div id="${elem.id}" class="elem-list">
                        <div class="checkbox true">
                            <img src="/access/icon/icon-check.png" alt="" class="icon">
                        </div>
                        <p class="elem-text">${elem.text}</p>
                        <div class="remove">
                            <img src="/access/icon/icon-del.png" alt="" class="icon">
                        </div>
                    </div>`;
        }

    }
    return new hbs.SafeString(result);
});

app.get("/", (inp, out) => {
    out.render("main.hbs");
});

app.use("/access", express.static(__dirname + "/access"));

app.get('/api/tasks/', function (inp, out) {
    let users = JSON.parse(fs.readFileSync('db.json', 'utf8'));
    out.send(users);
  })

app.get('/api/tasks/:id', function (inp, out) {
    var taskId = inp.params.id;
    let tasks = JSON.parse(fs.readFileSync('db.json', 'utf8'));
    let task;

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id == taskId) {
            task = tasks[i];
            break;
        }
    }
    // отправляем пользователя
    if (task) {
        out.send(task)
    } else {
        out.status(404).send()
    }
});

app.post('/api/tasks', jsonParser, (inp, out) => {
    if (!inp.body) return out.sendStatus(400);

    let taskText = inp.body.text;
    let task = { text: taskText, check: false };

    let tasks = JSON.parse(fs.readFileSync('db.json', 'utf8'));

    let taskId = Math.max.apply(
        Math,
        tasks.map(function (o) {
            return o.id;
        })
    );
    task.id = taskId + 1;

    tasks.push(task);

    fs.writeFileSync('db.json', JSON.stringify(tasks));
    out.send(task);
});

app.delete('/api/tasks/:id', function (inp, out) {
    let taskId = inp.params.id;
    let tasks = JSON.parse(fs.readFileSync('db.json', 'utf8'));
    let index = -1;

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id == taskId) {
            index = i;
            break;
        }
    }
    if (index > -1) {
        let task = tasks.splice(index, 1)[0];
        fs.writeFileSync('db.json', JSON.stringify(tasks));
        out.send(task);
    } else {
        out.status(404).send();
    }
});

app.put('/api/tasks', jsonParser, function (inp, out) {
    if (!inp.body) return out.sendStatus(400);

    let taskId = inp.body.id;
    let taskCheck = inp.body.check;

    let tasks = JSON.parse(fs.readFileSync('db.json', 'utf8'));

    let task;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id == taskId) {
            task = tasks[i];
            break;
        }
    }

    if (task) {
        task.check = taskCheck;

        fs.writeFileSync('db.json', JSON.stringify(tasks));
        out.send(task);
    }
    else {
        out.status(404).send(user);
    }
});



app.listen(3000);