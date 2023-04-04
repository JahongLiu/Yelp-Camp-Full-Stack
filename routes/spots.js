const express = require('express');
const router = express.Router();
const spots = require('../controllers/spots');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateSpot } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const Spots = require('../models/spots');

router.route('/')
    .get(catchAsync(spots.index))
    .post(isLoggedIn, upload.array('image'), validateSpot, catchAsync(spots.createSpots))


router.get('/new', isLoggedIn, spots.renderNewForm)

router.route('/:id')
    .get(catchAsync(spots.showSpots))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateSpot, catchAsync(spots.updateSpots))
    .delete(isLoggedIn, isAuthor, catchAsync(spots.deleteSpots));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(spots.renderEditForm))

module.exports = router;


