const sequelize = require('../config/connection');
const seedUser = require('./seedUser');
const seedPost = require('./seedPost');
const seedComment = require('./seedComment');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('Success!');
  
  await seedUser();
  console.log('Success!');

  await seedPost();
  console.log('Success!');

  await seedComment();
  console.log('Success!');

  process.exit(0);
};

seedAll();