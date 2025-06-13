const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn , isOwner , validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage });


router
    .route("/")
    // GET ROUTE
    .get(wrapAsync(listingController.index))
    // CREATE ROUTE
    .post(isLoggedIn , validateListing , upload.single('listing[image]')  , wrapAsync(listingController.createListing));
    


// NEW ROUTE
router.get("/new" , isLoggedIn , wrapAsync(listingController.renderNewForm));

// SEARCH ROUTE
router.get("/search", wrapAsync(listingController.searchByCountry));

router
    .route("/:id")
    // SHOW ROUTE
    .get( wrapAsync(listingController.showListing))
    // UPDATE ROUTE
    .put( isLoggedIn , isOwner , upload.single('listing[image]') , validateListing , wrapAsync(listingController.updateListing))
    // DELETE ROUTE
    .delete( isLoggedIn , isOwner , wrapAsync(listingController.destroyListing))


// EDIT ROUTE
router.get("/:id/edit" , isLoggedIn , isOwner , wrapAsync(listingController.renderEditForm)); 

module.exports = router;