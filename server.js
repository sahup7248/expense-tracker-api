const   express = require("express"),
        cors    = require("cors"),
        bodyParser = require("body-parser"),
        mongoose  = require("mongoose"),
        passport  = require("passport"),
        LocalStrategy = require("passport-local").Strategy,
        User    = require("./models/user");
        
// const loginRegisterRoutes = require('./routes/login-register'),
//       indexRoutes         = require('./routes/index');

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/expense-tracker",{
  useUnifiedTopology : true ,
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(passport.initialize());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// app.use(methodOverride("_method"));

//Requring routes
// app.use('/',indexRoutes);
// app.use('/',loginRegisterRoutes);

app.listen(port, error => {
  if (error) throw error;
  console.log('Server running on port ' + port);
});