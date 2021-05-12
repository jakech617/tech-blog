const router = require('express').Router();
const { Comment, User } = require('../../models');
const auth = require('../../utils/auth');

router.get('/', (req, res) => {
  Comment.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['username'],
      },
    ],
  })
    .then((CommentData) => {
      res.json(CommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Comment.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['username'],
      },
    ],
  })
    .then((CommentData) => {
      res.json(CommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', auth, (req, res) => {
  Comment.create({
    comment_text: req.body.comment_text,
    user_id: req.session.user_id,
    post_id: req.body.post_id,
  })
    .then((CommentData) => {
      res.json(CommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', auth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((CommentData) => {
      res.json(CommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;