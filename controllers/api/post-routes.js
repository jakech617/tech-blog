const router = require('express').Router();
const { Post, Comment } = require('../../models');
const auth = require('../../utils/auth');

router.post('/', auth, async (req, res) => {
    try {
      const newPost = await Post.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.get('/:id', auth, async (req, res) => {
      try {
          const individualPost = await Post.findByPk(req.params.id, {
            include: [{model: Comment}]
          })
          res.status(200).json(individualPost);
      }
      catch (err) {
          res.json(err);
      }
  })

  router.delete('/:id', auth, async (req, res) => {
    try {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!postData) {
        res.status(404).json({ message: 'No Post found with this id!' });
        return;
      }
  
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;