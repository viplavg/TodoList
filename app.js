const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");


const app = express();

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workitems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/", function(req, res) {

  let day = date();

  res.render("list", {listTitle: day, itemInputs: items});
});

app.post("/", function(req, res){
  let item = req.body.itemInput;

  if(req.body.list === "Work"){
    workitems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }


});

app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work List", itemInputs: workitems});
});


app.get("/about", function(req, res){
  res.render("about");
});


app.listen(3000, function() {
  console.log("Server started at port 3000");
});
