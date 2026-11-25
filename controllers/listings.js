const Listing = require("../models/listing.js")
const mbxgeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN
const geocodingClient = mbxgeocoding({ accessToken: mapToken });


// index Route
module.exports.index = async (req, res, next) => {
    let { category } = req.query;
    let filter = {};

    if (category) {
        const validCategories = Listing.schema.path("category").enumValues;

        if (!validCategories.includes(category)) {
            req.flash("error", "Invalid category");
            return res.redirect("/listings");
        }
        filter.category = category;
    }

    let allListings = await Listing.find(filter);
    res.render("listings/index.ejs", {
        allListings, selectedCategory: category || "All"
    });
};


// new route
module.exports.renderNewForm = (req,res)=>{
    // console.log(req.user)
    // if(!req.isAuthenticated()){
    //     req.flash('error','You must be logged in to create listing')
    //     return res.redirect("/login")
    // }
    res.render("listings/new.ejs")
}

// create listing 
module.exports.createListing = async (req,res,next)=>{

    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
    }).send()
    // console.log(response.body.features[0].geometry)
    // res.send("Done !")

    let url = req.file.path;
    let filename = req.file.filename;
    // console.log(url,"------",filename)

    let listing = req.body?.listing
    if (!listing.category) listing.category = "Others";
    let newListing = new Listing(listing)

    console.log(req.user)
    newListing.owner = req.user._id

    newListing.image = {url,filename}

    newListing.geometry = response.body.features[0].geometry

    let savedListing = await newListing.save()
    console.log(savedListing)
    req.flash("success","New Listing Created")
    console.log("New Listing Saved")
    res.redirect("/listings")
}

// show route
module.exports.showListing = async (req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id)
    .populate({  // Nested populate
        path : "reviews",
        populate : {path : "author"},
    }).
    populate("owner")

    if(!listing){
        req.flash("error","Your Requesting Listing Doesn't exist")
        return res.redirect("/listings")
    }
    // console.log(listing)
    res.render("listings/show.ejs",{listing})
}


// edit route
module.exports.renderEditForm = async (req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id)
    if(!listing){
        req.flash("error","Your Requesting Listing Doesn't exist")
        return res.redirect("/listings")
    }
    let originalImageUrl = listing.image.url
    originalImageUrl.replace("/upload","/upload/w_15")
    
    res.render("listings/edit.ejs",{listing,originalImageUrl})
}


//update route
module.exports.updateListing = async(req,res,next)=>{
    let {id} = req.params;
    // // if(!req.body?.listing) throw new ExpressError(400,"Send Valid Data for Listing")

    // let listing = await Listing.findById(id)

    // if(!listing.owner._id.equals(res.locals.currUser._id)){
    //     req.flash("error","You don't have the permission to edit")
    //     return res.redirect(`/listings/${id}`)
    // }
    let listingData = {...req.body.listing}
    if (!listingData.category)    listingData.category = "Others";
    
    let updatedListing = await Listing.findByIdAndUpdate(
        id,listingData, {returnDocument : "after",runValidators:true}
    )
    if(typeof req.file !== 'undefined'){
        let url = req.file.path;
        let filename = req.file.filename;
        updatedListing.image = {url,filename}
        await updatedListing.save()
    }

    req.flash("success","Listing updated")
    // console.log(updatedListing)
    res.redirect(`/listings/${id}`)
}


// delete route
module.exports.deleteListing = async (req,res,next)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    // console.log(deletedListing)
    console.log("Listing Deleted")
    req.flash("success","Listing Deleted")
    res.redirect("/listings")
}