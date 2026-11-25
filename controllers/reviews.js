const Listing = require("../models/listing.js")
const Review = require("../models/review.js")

module.exports.createReview = async(req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id)
    // console.log(listing)
    let review = req.body.review
    // console.log(review)
    let newReview = new Review(review)

    newReview.author = req.user._id
    console.log(newReview)

    listing.reviews.push(newReview)
    await newReview.save()
    await listing.save()
    console.log("Review saved")
    req.flash("success","Review Created")
    res.redirect(`/listings/${id}`)
}

module.exports.deleteReview = async(req,res,next)=>{
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull : {reviews : reviewId}})
    await Review.findByIdAndDelete(reviewId)
    console.log("Review Deleted")
    req.flash("success","Review Deleted")
    res.redirect(`/listings/${id}`)
}