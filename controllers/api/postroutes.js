const router = require('express').Router();
const { Post, Comment, User} = require('../../models');

router.get('/dashboard/:id', async (req, res) =>{
    try {
        const usersPost = await Post.findByPk(req.params.id );
        const post = usersPost.get({ plain: true });
        req.session.post_id = post.id;
        res.json(post);
      } catch (err) {
        res.status(400).json("its something else");
      }
})



module.exports = router;