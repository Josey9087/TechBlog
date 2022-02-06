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

module.exports = router;