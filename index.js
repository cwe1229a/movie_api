const express = require('express'),
  morgan = require('morgan'),
  fs = require('fs'),
  path = require('path');

const app = express();
const bodyParser = require('body-parser'),
  methodOverride = require('method-override');
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})

//logging 
app.use(morgan('combined', {stream: accessLogStream}));

//movie list
let movies = [
  {
    Title: 'The Crimson Pirate',
    Director: 'Robert Siodmak'
  },

  {
    Title: 'Captain Blood',
    Director: 'Michael Curtiz'
  },

  {
    Title: 'The Sea Hawk',
    Director: 'Michael Curtiz'
  },

  {
    Title: 'Against All Flags',
    Director: 'George Sherman'
  },

  {
    Title: 'The Master of Ballantrae',
    Director: 'William Keighley'
  },

  {
    Title: 'Pirates of the Caribbean: The Curse of the Black Pearl',
    Director: 'Gore Verbinski'
  },

  {
    Title: 'Pirates of the Caribbean: Dead Mans Chest',
    Director: 'Gore Verbinski'
  },

  {
    Title: 'Pirates of the Caribbean: On Stranger Tides',
    Director: 'Rob Marshall'
  },

  {
    Title: 'Blackbeard: Terror at Sea',
    Director: 'Richard Dale'
  },

  {
    Title: 'Cutthroat Island',
    Director: 'Renny Harlin'
  },
]
//get requests
app.get('/', (req, res) => {
  res.send('Welcome to my movie app!');
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', {root: __dirname});
});

app.get('/movies', (req, res) => {
  res.send('Pirate Movies!');
});


app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(methodOverride());

app.use('/Documentation', express.static('public'));

//error check
app.use((err, req, res, next) => {
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
