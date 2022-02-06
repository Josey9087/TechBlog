const router = require('express').Router();

const { User, Post, Comment } = require('../models');

router.get('/', async (req, res) => {
    // find all categories
    try {
      const category = await Post.findAll(
        {
            include: [
              {
                model: User,
                attributes: ['username'],
              },
            ],
          }
      );
      res.json(category);
    } catch (err) {
      console.log("Wrong");
      // be sure to include its associated Products
    }
  });

module.exports = router;