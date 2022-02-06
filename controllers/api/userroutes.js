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

module.exports = router;