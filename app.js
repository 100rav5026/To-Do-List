const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/todolistDB');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

mongoose.set('strictQuery', false);

// var items = [];
// var workItems = [];

const itemsSchema = new mongoose.Schema({
  name: String
});

const Item = mongoose.model('Item', itemsSchema);

const Item1 = new Item({
  name: "Play Fifa"
});

const Item2 = new Item({
  name: "Workout"
});

const Item3 = new Item({
  name: "Web Development"
});

// Item.insertMany([Item1, Item2, Item3], function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Items are added successfully");
//   }
// });

app.get("/", function(req, res) {

  // var today = new Date();
  // var options = {
  //   weekday: "long",
  //   day: "numeric",
  //   month: "long"
  // };
  //
  // var currentDay = today.getDay();
  // var day = today.toLocaleDateString("en-US", options);

  Item.find({}, function(err, todolistitems) {
    res.render('list', {
      pageTitle: "Today",
      todolistitems: todolistitems
    });
  })
});

app.post("/", function(req, res) {
  if (req.body.button == "Work") {
    var item = req.body.todolistitems;
    workItems.push(item);
    res.redirect('/work');
  } else {
    var item = req.body.todolistitems;
    const newItem = new Item({
      name: item
    });
    newItem.save();

    res.redirect('/');
  }
});

app.post("/delete", function(req, res){
  itemId = req.body.checkbox;
  Item.findByIdAndRemove(itemId, function(err){
    if (err) {
      console.log(err);
    } else {
      console.log("Item Removed successfully");
      res.redirect('/');
    }
  })
});

app.get("/work", function(req, res) {
  res.render('list', {
    pageTitle: "Work Items",
    todolistitems: workItems
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Listening on Port 3000 locally");
});
