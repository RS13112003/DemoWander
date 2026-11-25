const Listing = require("./models/listing.js")
const ExpressError = require("./utils/ExpressError.js")
const { listingSchema , reviewSchema} = require("./schema.js")
const Review = require("./models/review.js")

module.exports.isLoggedIn = (req,res,next)=>{
    // console.log(req.path,"----",req.originalUrl)
    // console.log(req.user)

    if(!req.isAuthenticated()){
        // redirectUrl saved
        req.session.redirectUrl = req.originalUrl
        req.flash('error','You must be logged in to create listing')
        return res.redirect("/login")
    }
    next()
}

// Passport automatically delete all the objects just after login
//  of the req.sessions including req.sessions.redirectUrl also. So 
// We save req.session.redirectUrl in res.locals coz local is 
// accessible in everwhere


module.exports.savedRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl) res.locals.redirectUrl = req.session.redirectUrl
    next()
}


module.exports.isOwner=async (req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id)

    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You are not the owner of this listing")
        return res.redirect(`/listings/${id}`)
    }

    next()
}


module.exports.ValidListing = (req,res,next)=>{
    console.log(req.body)
    let {error} = listingSchema.validate(req.body)
    // const { error } = listingSchema.validate(req.body, { abortEarly: false });
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(", ")
        throw new ExpressError(400,errMsg)
    }
    else next();
}

module.exports.ValidReview = (req,res,next)=>{
    console.log(req.body)
    let {error} = reviewSchema.validate(req.body)
    // const { error } = listingSchema.validate(req.body, { abortEarly: false });
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(", ")
        throw new ExpressError(400,errMsg)
    }
    else next();   
}


module.exports.isReviewAuthor=async (req,res,next)=>{
    let {id,reviewId} = req.params;
    let review = await Review.findById(reviewId)

    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error","You are not the author of this review")
        return res.redirect(`/listings/${id}`)
    }

    next()
}


module.exports.setDefaultCategory = (req, res, next) => {
    if (req.body.listing && !req.body.listing.category) {
        req.body.listing.category = "Others";
    }
    next();
};