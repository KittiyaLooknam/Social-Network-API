const route = require("express").Router();
const apiRountes = require( "./api");
const router = require("./api/thought-routes");
// Handles routing for all the different pages of our app.

router.use("/api", apiRountes);

router.use((req, res) => {
    // If no API routes are hit, send the user to the home page 
    return res.send("Wrong Rount!");
});

module.exports = router;