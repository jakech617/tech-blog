const router = require('express').Router();
const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboardRoutes');
const homeRoutes = require('./homeRoutes');


router.use('/', apiRoutes);
router.use('/', dashboardRoutes);
router.use('/', homeRoutes);


module.exports = router;
