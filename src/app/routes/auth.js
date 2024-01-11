const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route to redirect the user to Google for authentication
router.get('/google', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/userinfo.email']
}));

// Route for Google callback after authentication
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  // Successful authentication, redirect home.
  req.session.save(err => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.redirect(process.env.CLIENT_ORIGIN);
    }
  });
});

// Route to handle user logout
router.get('/logout', async (req, res) => {
  //req.logout();
  //req.session.destroy((err) => {
    //if (err) {
     // console.error(err);
    //}
    req.session.destroy();
    res.redirect(process.env.CLIENT_ORIGIN);
  });
//});

module.exports = router;
