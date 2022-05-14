const express = require('express'),
     morgan = require('morgan'),
     bodyParser = require('body-parser'),
     uuid = require('uuid');
//const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})
const app = express();
// //logging
//app.use(morgan('common'));

app.use(bodyParser.json());

//app.use(bodyParser.urlencoded({
  //extended: true
//}));

app.use('/Documentation', express.static('public'));

// //error check
app.use((err, req, res, next) => {
  consolve.error(err.stack);
  res.status(500).send('something broke!')
});

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
  }
];

//user list
let users = [
  {
    id: 1,
    name: 'Jessica',
    favoriteMovies: [],
  },

  {
    id: 2,
    name: 'Leah',
    favoriteMovies: ['Cutthroat Island'],
  }
];

//get requests Read
app.get('/', (req, res) => {
  res.send('Welcome to my movie app!');
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', {root: __dirname});
});
//gets data of all pirate movies
app.get('/movies', (req, res) => {
  res.status(200).json(movies);
});

app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.find(movie => movie.Title === title);
    if(movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('no such movie');
      }
});

app.get('/movies/:director', (req, res) => {
    const { directorName } = req.params;
    const Director = movies.find(movie => movie.Director.Name === directorName );
    if (Director) {
        res.status(200).json(Director);
    } else {
        res.status(400).send('that is not a director')
      }
});

// create
//register new user
app.post('/users', (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser)
  } else {
    res.status(400).send('users need names')
  }
});
//update
//updating user
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find( user => user.id == id);

    if (user) {
        user.name = updatedUser.name;
        res.status(201).json(user);
    } else {
        res.status(400).send('no such user')
      }
});
//create
//add movie to user list
app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find( user => user.id == id);

    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to user ${id} array`);;
    } else {
        res.status(400).send('no such user')
      }
});
//delete
//remove movie
app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find( user => user.id == id);

    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
        res.status(200).send(`${movieTitle} has been removed from user ${id} array`);;
    } else {
        res.status(400).send('no such user')
      }
});
//delete
//remove user
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    let user = users.find( user => user.id == id);

    if (user) {
        users = users.filter( user => user.id != id);
        res.status(200).send(`user ${id} has been removed`);;
    } else {
        res.status(400).send('no such user')
      }
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
