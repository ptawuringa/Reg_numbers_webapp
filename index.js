const flash = require('express-flash');
const session = require('express-session');
var bodyParser = require('body-parser')
let express = require('express');
const numberPlates = require('./registration_number')
let app = express();

const exphbs = require('express-handlebars');

const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://taruwinga:numbers1@localhost:5432/reg_numbers';

const pool = new Pool({
  connectionString,

});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const regX = numberPlates(pool)

// initialise session middleware - flash-express depends on it
app.use(session({
  secret: "<This is my string that i used for session>",
  resave: false,
  saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());

app.engine('handlebars', exphbs({ layoutsDir: "./views/layouts/" }));
app.set('view engine', 'handlebars');


app.get("/", function (req, res) {
  res.render("index");
});

app.get('/addFlash', function (req, res) {
  req.flash('info', 'Flash Message Added');
  res.redirect('/');
});

app.use(express.static('public'));

app.get('/registration/:regType', function (req, res) {
  

  res.render('reg', {
    regType,
    reg

  })

});


app.post('/regNumbers', async function (req, res) {

  var reg = req.body.regNumber
  await regX.addPlate(reg)


  // console.log(reg)





  res.render("index");
});



let PORT = process.env.PORT || 3004;

app.listen(PORT, function () {
  console.log('App starting on port', PORT)
});