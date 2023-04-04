const Spots = require('../models/spots');
const Review = require('../models/review');

module.exports.createReview = async (req, res,) => {
    const spot = await Spots.findById(req.params.id);
    const review = new Review(req.body.review)
    review.author = req.user._id;
    spot.reviews.push(review);
    await review.save();
    await spot.save();
    req.flash('success', 'Created new review!')
    res.redirect(`/spots/${spot._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Spots.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/spots/${id}`);
}