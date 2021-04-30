const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] },
  })
    .then((UserData) => res.json(UserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Post,
        attributes: ['id', 'title', 'post_content', 'created_at'],
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'created_at'],
        include: {
          model: Post,
          attributes: ['title'],
        },
      },
    ],
  })
    .then((UserData) => {
      if (!UserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(UserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', async (req, res) => {
  try {
    const UserData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = UserData.id;
      req.session.name = UserData.name;
      req.session.loggedIn = true;

      res.status(200).json(UserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const UserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!UserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await UserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = UserData.id;
      req.session.name = UserData.name;
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: UserData, message: 'Logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;