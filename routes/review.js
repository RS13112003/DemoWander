const express = require("express")
const router = express.Router({mergeParams:true})
// With out {mergeParams:true} review doen't saved
// const ExpressError = require("../utils/ExpressError.js")
const wrapAsync = require("../utils/wrapAsync.js")
// const { listingSchema , reviewSchema} = require("../schema.js")
const Review = require("../models/review.js")
const Listing = require("../models/listing.js")
const {ValidReview,isLoggedIn,isReviewAuthor} = require("../middleware.js")
const reviewController = require("../controllers/reviews.js")


// review post
router.post("/",isLoggedIn,ValidReview,
    wrapAsync(reviewController.createReview))


// delete Review
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,
    reviewController.deleteReview)

module.exports = router