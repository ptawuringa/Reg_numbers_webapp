const flash = require('express-flash');
const session = require('express-session');
var bodyParser = require('body-parser')
let express = require('express');
const numberPlates = require('./registration_number')
let app = express();

const exphbs = require('express-handlebars');

const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://patience:pg123@localhost:5432/reg_numbers';

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
app.use(express.static('public'));


app.get("/", async function (req, res) {
  var data = await regX.getData();
  res.render("index", { regs: data });
});

app.get('/addFlash', function (req, res) {
  req.flash('info', 'Flash Message Added');
  res.redirect('/');
});


app.get('/registration/:regType', async function (req, res) {
  var regType = req.body.regNumber
  await regType.selectPlate(regType)

  res.render('', {

  })

});

app.get("/reset",async function(req,res){
  // var reg = req.body.regNumber
  await regX.deleteOne();
  res. redirect("/");
});


app.post('/filter', async function (req, res) {
  const town = req.body.town() 

  let data;
  console.log(town);
  if (town === 'All' || town === 'ALL') {
    data = await regX.getData();

  } else {
    const townId = await regX.getTownId(town);
    data = await regX.getSelectedTown(townId)

  }

  console.log({ data });
  res.render('index', {
    regs: data

  })
})



app.post('/regNumbers', async function (req, res) {

  console.log("here");
  var reg = req.body.regNumber


  if (reg === "") {

    req.flash('info', ' Please enter your plate');

  } else if (regX === undefined) {
    req.flash('info', 'Please select your town');
  } else if (!(/C[AYJ] \d{3,5}$/.test(reg)) ||(!(/[a-zA-Z]/.test(reg)))) {
    req.flash('info', 'Enter proper number plate')
  }else{
  
  await regX.insertData(reg);
  }
  var data = await regX.getData();


  res.render("index", {
    regs: data
  });


});



let PORT = process.env.PORT || 3004;

app.listen(PORT, function () {
  console.log('App starting on port', PORT)
});