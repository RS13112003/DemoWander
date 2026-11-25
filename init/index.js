const path = require("path");

require("dotenv").config({
    path: path.resolve(__dirname, "../.env")
});

const mongoose = require('mongoose');
const Listing = require("../models/listing.js");
const initData = require("./data.js");

const mbxgeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;

const geocodingClient = mbxgeocoding({
    accessToken: mapToken
});

main().then(async (res) => {
    console.log("Connection Successful");
    // await initDB();
})
.then(() => {
    // console.log("Data Re-initialized");
}).catch(err => console.log(err))


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/WanderLand');
}


const initDB = async () => {

    // Generate geometry for every sample listing
    for (let listing of initData.data) {

        let response = await geocodingClient.forwardGeocode({
            query: `${listing.location}, ${listing.country}`,
            limit: 1
        }).send();

        let feature = response.body.features[0];
        if (!feature) {
            throw new Error(`Location not found: ${listing.location}`);
        }

        listing.geometry = feature.geometry;
    }

    // await Listing.deleteMany({});
    initData.data = initData.data.map((ob) => ({
        ...ob,
        owner: '6b06f2a692b6fadcc19e0f22'
    }));

    await Listing.insertMany(initData.data);
    console.log("Data inserted")
};
initDB();