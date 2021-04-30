const { User } = require('../models');

const userData = [
  {
    name: 'Sal',
    username: 'sal01',
    email: 'sal@hotmail.com',
    password: 'password12345',
  },
  {
    name: 'Lernantino',
    username: 'lerantino02',
    email: 'lernantino@gmail.com',
    password: 'password12345',
  },
  {
    name: 'Amiko',
    username: 'amiko03',
    email: 'amiko2k20@aol.com',
    password: 'password12345',
  },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;