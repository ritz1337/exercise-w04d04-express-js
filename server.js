// # Express Practice
var express = require('express');
var app = express();
var fs = require('fs');

// GET '/'
app.get('/', function(req, res) {
  // render a link to '/counter'
  var html = '<a href="/counter">Click Me</a>';
  res.send(html);
});

// GET '/counter?vote=up'
// GET '/counter?vote=down'
  // increment a counter up or down
app.get('/counter', function(req, res){
  var counter = 0;
  if (req.query.vote === 'up') {
    counter++;
  } else if (req.query.vote === 'down') {
    counter--;
  }
  res.send('Counter is' + counter);
});

// Respond to
// GET '/greet/dave'
// GET '/greet/susan'
var visitors = [];

app.get('/greet/:name', function(req, res){
  var name = req.params.name;
  visitors.push(name);
  // render <h1>Hello [name]!</h1>
  var title = '<h1>Hello ' + name + '!</h1>';
  // and a link to '/visitors'
  var link = '<a href="/visitors">Visitors</a>';
  res.send(title + link);
});

// GET '/visitors'
app.get('/visitors', function(req, res) {
  // res.json(visitors);
  var html = '<ul>'
  visitors.forEach(function(visitor) {
    html += "<li>" + visitor + "</li>"
  });
  html += "</ul>"
  res.send(html);
  // render a list of all the names from '/greet/:name'

});

// GET '/visitors.json'
  // send a list of all the names from '/greet/:name' as json
app.get('/visitors.json', function(req, res){
  res.json(visitors);
})
// Respond to any
// GET '/trip?to=paris'
// GET '/trip?to=rome'
  // send a 302 redirect to '/visiting/:place'
app.get('/trip', function(req, res) {
  var place = req.query.to;
  res.redirect('/visiting/' + place);
});
// Respond to...
var places = {}
app.get('/visiting/:place', function(req, res) {
  var place = req.params.place;
  places[place] = places[place] || 0;
  places[place]++;
  res.send('i am in ' + place + ' for my ' + places[place] + ' time.');
});
// GET '/visiting/paris'
// GET '/visiting/rome'
  // render You are visiting [place] you have been here [number] of times

// Respond to EITHER
// GET '/visits'
// GET '/visits.json'
  // render an HTML table that shows the places visited and number of times
  // render JSON
app.get('/visits?(:format)', function(req, res) {
  if (req.params.format === '.json') {
    return res.json(places);
  }
  var html = '<table><tr><td>Place</td><td>Visits</td></tr>';
  for (var place in places) {
    var count = places[place];
    html += '<tr><td>' + place + '</td><td>' + count + '</td></tr>';
  }
  html += '</table>';
  res.send(html);
})

var port = 3000;
app.listen(port, function(){
  console.log('Listening on port ' + port);
});
