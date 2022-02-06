const router = require('express').Router();
const User = require('../../models/User');


router.get('/', async (req, res) => {
  // find all categories
  try {
    const category = await User.findAll(
    );
    res.json(category);
  } catch (err) {
    console.log("Wrong");
    // be sure to include its associated Products
  }
});

router.post('/', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });
    if (userData) {
      res
        .status(400)
        .json({ message: 'User already exists please login' });
      return;
    }
    const usercreateData = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = usercreateData.id;
      req.session.logged_in = true;
      res.json({ user: req.session.user_id, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: req.session.user_id, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json("its something else");
  }
});


//Logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


module.exports = router;