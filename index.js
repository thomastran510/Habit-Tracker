const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const path = require('path');
dotenv.config();
//access css
app.use("/static", express.static("public"));
 
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
 
app.use(express.urlencoded({ extended: true }))
var router = express.Router(); //handles routes
//hold inputs in array
var task = [];
var complete = [];
//post user inputs into array
app.post('/addtask', function (req, res) {
    var newTask = req.body.newtask;
    task.push(newTask);
    res.redirect("/");
});
app.post("/removetask", function(req, res) {
    var completeTask = req.body.check;
    //check for the "typeof" the different completed task, then add into the complete task
    if (typeof completeTask === "string") {
        console.log("delete");
        complete.push(completeTask);
        //check if the completed task already exits in the task when checked, then remove it
        task.splice(task.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
        for (var i = 0; i < completeTask.length; i++) {
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }
    res.redirect("/");
});
 
router.get('/about', function (req, res) {
 
    res.sendFile(path.join(__dirname+'/views/about.html'))
});
router.get('/login', function (req, res) {
    
    res.sendFile(path.join(__dirname+'/views/login.html'))
});
router.get('/register', function (req, res) {
    
    res.sendFile(path.join(__dirname+'/views/register.html'))
});
app.set("view engine", "ejs");
//Get Method
app.get('/', (req, res) => {
    res.render('todo.ejs', { task: task, complete: complete});
});
 
 
//Post Method
app.post('/', (req, res) => {
    console.log(req.body);
});
// app.post("/removetask", function(req, res) {
//     var completeTask = req.body.check;
//     //check for the "typeof" the different completed task, then add into the complete task
//     if (typeof completeTask === "string") {
//         complete.push(completeTask);
//         //check if the completed task already exits in the task when checked, then remove it
//         task.splice(task.indexOf(completeTask), 1);
//     } else if (typeof completeTask === "object") {
//         for (var i = 0; i < completeTask.length; i++) {
//             complete.push(completeTask[i]);
//             task.splice(task.indexOf(completeTask[i]), 1);
//         }
//     }
//     res.redirect("/");
// });
app.use('/', router);
app.listen(3000, () => console.log("Server Live"));
 

