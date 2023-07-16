const express = require('express');
const router = express.Router();
const intersectionsController = require('../controllers/intersectionsController');

// POST /api/intersections
router.post('/', intersectionsController.findIntersections);

module.exports = router;
