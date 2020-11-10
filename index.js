const flash = require('express-flash');
const session = require('express-session');
var bodyParser = require('body-parser')
let express = require('express');
const numberPlates = require('./registration_number')
let app = express();

const exphbs = require('express-handlebars')

 // initialise session middleware - flash-express depends on it
 app.use(session({
    secret : "<This is my string that i used for session>",
    resave: false,
    saveUninitialized: true
  }));

  // initialise the flash middleware
  app.use(flash());

  app.engine('handlebars', exphbs({ layoutsDir: "./views/layouts/"}));
  app.set('view engine', 'handlebars');


app.get("/", function(req, res){
    res.render("index");
  });

app.get('/addFlash', function (req, res) {
    req.flash('info', 'Flash Message Added');
    res.redirect('/');
  });

app.use(express.static('public'));

app.post('/registration_number',numberPlates);



let PORT = process.env.PORT || 3014;

app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});