const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth')
// this will display all on home without showing comments but will show username of poster

router.get('/home', async (req, res) => {
    try {
      const Postdata = await Post.findAll(
        {
            include: [
              {
                model: User,
                attributes: ['username'],
              },
            ],
          }
      );
      res.json(Postdata);
    } catch (err) {
      console.log("Wrong");
    }
  });

// // this is for when you click on a post and it shows the comments on it and username of the poster and username of commenters
router.get("/home/:id", async (req, res) => {
  try {
    const idPostData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Comment,
          attributes: ["body"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });

    const post = idPostData.get({ plain: true });
    req.session.post_id = post.id
    res.json(post)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// will display dashboard with only posts made by the user logged in
router.get("/dashboard", withAuth, async (req,res) => {
  try {
    const idDashboard = await User.findByPk(req.session.user_id,
    { 
      attributes: { exclude: ['password'] },
      include: 
      {
        model: Post,
        attributes: ["title", "body"],
        include: {
          model: User,
          attributes: ["username"],
          model: Comment,
          attributes: ["body"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      },
    });

    const userpost = idDashboard.get({ plain: true });
    res.json(userpost)

  }catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})






module.exports = router;