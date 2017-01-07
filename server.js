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
app.get('/visitors.json', function(req, res) { //there is no json file, it's just a url
  res.json(names);
})


// Respond to any
// GET '/trip?to=paris'
// GET '/trip?to=rome'
app.get('/trip', function(req, res){
  var place = req.query.to; //whatever is inputted after ?to=

  // send a 302 redirect to '/visiting/:place'

  res.redirect('/visiting/' + place);

});

// locVisited = {
//   Italy: {
//     Counter: 4
//   }
//   France: {
//     Counter: 5
//   }
// }

// locVisited = {
//   Italy:
// }

var places = {}

// Respond to...
app.get('/visiting/:place', function(req,res){
  var place = req.params.place;
  places[place] = places[place] || 0; //if the place key is
  places[place]++;
  res.send('i am in ' + place + ' for the ' + places[place] + ' time!'); //because place is whatever is typed in the url after /visiting
})
// GET '/visiting/paris'
// GET '/visiting/rome'
  // render You are visiting [place] you have been here [number] of times
app.get('/visiting/:place', function(req,res){

})
// Respond to EITHER
// GET '/visits'
// GET '/visits.json'
  // render an HTML table that shows the places visited and number of times
  // render JSON

var port = 3000;
app.listen(port, function(){
  console.log('Listening on port ' + port);
});
