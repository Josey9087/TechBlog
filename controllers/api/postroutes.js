const router = require('express').Router();
const { Post, Comment, User} = require('../../models');
const withAuth = require('../../utils/auth')

router.get('/dashboard/:id', withAuth, async (req, res) =>{
    try {
        const usersPost = await Post.findByPk(req.params.id );
        const post = usersPost.get({ plain: true });
        req.session.post_id = post.id;
        res.json(post);
      } catch (err) {
        res.status(400).json("its something else");
      }
})

router.post('/comment', withAuth, async (req, res) => {
    try {

        const userComment = await Comment.create({
          body: req.body.body,
          user_id: req.session.user_id,
          post_id: req.session.post_id,
        });
        res.status(200).json(userComment);
    } catch(err) {
        res.status(400).json("its something else");
      }
})



module.exports = router;