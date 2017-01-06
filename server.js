// # Express Practice
var express = require('express');
var app = express();

// GET '/'
app.get('/', function(req, res) {
  // render a link to '/counter'
  var html = "<a href=\"/counter\">counter</a>" //can be written as: var html = "<a href='/counter'>counter</a>" to avoid using \ to escape from normal flow
  res.send(html);
});

// GET '/counter?vote=up'
// GET '/counter?vote=down'
  // increment a counter up or down

app.get('/counter', function(req, res){
  var counter = 0; //counter getting to 0 on every page load
  if (req.query.vote === 'up') {      //?vote=down || ?vote=up
    counter++;
  } else if (req.query.vote === 'down') {
    counter--;
  }
  res.send('counter is' + counter);


})

// Respond to
// GET '/greet/dave'
// GET '/greet/susan'
  // render <h1>Hello [name]!</h1>
  // and a link to '/visitors'
  // https://expressjs.com/en/guide/routing.html#route-parameters
var names = [];
app.get('/greet/:name', function(req, res){ // colon looks for pattern as explained in url above
    var name = req.params.name
    var title = "<h1> Hello " + name + "!</h1>";
    var link = "<a href='/visitors'>Visitors</a>";
    names.push(name);
    res.send(title + link);


})

// GET '/visitors'
  // render a list of all the names from '/greet/:name'
app.get('/visitors', function(req, res){
  var list = "<ul>"
  for(var i = 0; i <names.length; i++) {
    var list = list + "<li>" + names[i] + "</li>";
  }
  list = list + "</ul>"
  res.send(list);
})


// GET '/visitors.json'
  // send a list of all the names from '/greet/:name' as json

// Respond to any
// GET '/trip?to=paris'
// GET '/trip?to=rome'
  // send a 302 redirect to '/visiting/:place'

// Respond to...
// GET '/visiting/paris'
// GET '/visiting/rome'
  // render You are visiting [place] you have been here [number] of times

// Respond to EITHER
// GET '/visits'
// GET '/visits.json'
  // render an HTML table that shows the places visited and number of times
  // render JSON

var port = 3000;
app.listen(port, function(){
  console.log('Listening on port ' + port);
});
