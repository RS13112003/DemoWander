const express = require("express")
const router = express.Router()
const Listing = require("../models/listing.js")
// const ExpressError = require("../utils/ExpressError.js")
const wrapAsync = require("../utils/wrapAsync.js")
// const { listingSchema , reviewSchema} = require("../schema.js")
const {isLoggedIn,isOwner,ValidListing} = require("../middleware.js")
const ListingController = require("../controllers/listings.js")

const multer = require("multer")
const {storage} = require("../cloudConfig.js")
const upload = multer({storage });


const setDefaultCategory = (req, res, next) => {
    if (req.body.listing && !req.body.listing.category) {
        req.body.listing.category = "Others";
    }
    next();
};

router.route("/")
.get(wrapAsync(ListingController.index)) // index route
.post(isLoggedIn,upload.single("listing[image]"),setDefaultCategory,
    wrapAsync(ListingController.createListing))

// .post(upload.single("listing[image]"),(req,res)=>{
//     res.send(req.file)
// })  ValidListing, 



// New Route
router.get("/new",isLoggedIn,ListingController.renderNewForm)

router.route("/:id")
.get(wrapAsync(ListingController.showListing))  // show route

.put(isLoggedIn,isOwner,upload.single("listing[image]"), ValidListing,  // update route
wrapAsync(ListingController.updateListing))

.delete(isLoggedIn,isOwner,
wrapAsync(ListingController.deleteListing))


// Edit Route
router.get("/:id/edit",isLoggedIn,isOwner, 
wrapAsync(ListingController.renderEditForm))

module.exports = router

// // index Route
// router.get("/",wrapAsync(ListingController.index))

// // New Route
// router.get("/new",isLoggedIn,ListingController.renderNewForm)

// // Create Route
// router.post("/",isLoggedIn,ValidListing,
//     wrapAsync(ListingController.createListing))


// // Show Route
// router.get("/:id",wrapAsync(ListingController.showListing))


// // Edit Route
// router.get("/:id/edit",isLoggedIn,isOwner, 
//    wrapAsync(ListingController.renderEditForm))


// // Update Route
// router.put("/:id",isLoggedIn,isOwner,ValidListing,
//     wrapAsync(ListingController.updateListing))


// Delete Route
// router.delete("/:id",isLoggedIn,isOwner,
//     wrapAsync(ListingController.deleteListing))

// module.exports = router