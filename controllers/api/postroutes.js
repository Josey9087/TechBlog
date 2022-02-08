const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth')

router.get("/dash/:id", withAuth, async (req, res) => {
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
    res.render("update", { post })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/comment', withAuth, async (req, res) => {
  try {

    const userComment = await Comment.create({
      body: req.body.body,
      user_id: req.session.user_id,
      post_id: req.session.post_id,
    });
    res.status(200).json(userComment);
  } catch (err) {
    res.status(400).json("its something else");
  }
})

router.post('/posting', withAuth, async (req, res) => {
  try {
    userPosting = await Post.create({
      title: req.body.title,
      body: req.body.body,
      user_id: req.session.user_id
    })
    res.status(200).json(userPosting);
  } catch (err) {
    res.status(400).json("its something else");
  }
})


router.delete('/delete/:id', async (req, res) => {
  try {
    const deletePost = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      },
    });
    if (!deletePost) {
      res.status(404).json({ message: 'No post found' });
      return;
    }
    res.status(200).json(`Posts number ${req.params.id} has been deleted`);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/dashboard/:id', async (req, res) => {
  try {
    const userData = await Post.update({
      title: req.body.title,
      body: req.body.body
    }, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(req.body);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;