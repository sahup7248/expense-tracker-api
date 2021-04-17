const   express = require("express"),
        cors    = require("cors"),
        bodyParser = require("body-parser"),
        mongoose  = require("mongoose"),
        passport  = require("passport"),
        localStrategy = require("passport-local").Strategy,
        UserModel    = require("./models/user");
        
const loginRegisterRoutes = require('./routes/loginRegister'),
      indexRoutes         = require('./routes/indexRoutes');

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://admin:admin123@cluster0.afvpb.mongodb.net/userDataDB?retryWrites=true&w=majority",{
  useUnifiedTopology : true ,
  useCreateIndex: true,
  useNewUrlParser: true
});


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors());

// app.use(passport.initialize());

passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.create({ email, password });
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.findOne({ email });

        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: 'Wrong Password' });
        }

        return done(null, user, { message: 'Logged in Successfully' });
      } catch (error) {
        return done(error);
      }
    }
  )
);

//Requring routes
app.use('/api/v001/data/',indexRoutes);
app.use('/api/v001/user/',loginRegisterRoutes);

app.listen(port, error => {
  if (error) throw error;
  console.log('Server running on port ' + port);
});