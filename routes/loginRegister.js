const express   = require("express"),
      router    = express.Router(),
      passport  = require("passport"),
      jwt = require('jsonwebtoken');


router.post(
    '/signup',
    passport.authenticate('signup', { session: false }),
    async (req, res, next) => {
        const body = { _id: req.user._id, email: req.user.email };
        const token = jwt.sign({ user: body }, "SECRET@123");
        res.json({
            message: 'Signup successful',
            user: req.user.email,
            token
        });
    }
);

router.post(
    '/login',
    async (req, res, next) => {
      passport.authenticate(
        'login',
        async (err, user, info) => {
          try {
            if (err || !user) {
              const error = new Error('An error occurred.');
              return next(error);
            }
            req.login(
              user,
              { session: false },
              async (error) => {
                if (error) return next(error);
  
                const body = { _id: user._id, email: user.email };
                const token = jwt.sign({ user: body }, "SECRET@123");
                return res.json({ token, body });
              }
            );
          } catch (error) {
            return next(error);
          }
        }
      )(req, res, next);
    }
);


module.exports = router;