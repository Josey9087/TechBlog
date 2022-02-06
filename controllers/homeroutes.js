const router = require('express').Router();
const { User, Post, Comment } = require('../models');

// this will display all on home without showing comments but will show username of poster

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

// this is for when you click on a post and it shows the comments on it and username of the poster and username of commenters
router.get("/:id", async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          attributes: ["body"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        { model: User, attributes: ["username"] },
      ],
    });

    const post = dbPostData.get({ plain: true });
    req.session.post_id = post.id
    res.json(post)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



module.exports = router;