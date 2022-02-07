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
      const posts = Postdata.map(post => post.get({ plain: true }));
      res.render("display", {
        posts,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      console.log("Wrong");
    }
  });

router.get("/login", async (req, res) =>{
  try {
    res.render("login")
  } catch (err) {
    console.log("Wrong");
}})

// will display dashboard with only posts made by the user logged in
router.get("/dashboard", withAuth, async (req,res) => {
  try {
    const idDashboard = await User.findByPk(req.session.user_id,
      { 
        attributes: { exclude: ['password'] },
        include: {
        model: Post,
        attributes: ["title", "body", "id"],
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
    res.render("dashboard",{...userpost})

  }catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

// // this is for when you click on a post and it shows the comments on it and username of the poster and username of commenters
router.get("/:id", withAuth, async (req, res) => {
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
    res.render("comments",{post})
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});






module.exports = router;