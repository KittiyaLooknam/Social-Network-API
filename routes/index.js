const router = require("express").Router();
const apiRountes = require( "./api");

router.use("/api", apiRountes);

router.use((req, res) => {
    // If no API routes are hit, send the user to the home page 
    return res.send("Wrong Rount!");
});

module.exports = router;