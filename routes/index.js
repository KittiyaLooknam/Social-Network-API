const router = require("express").Router();
const apiRoutes = require("./api"); // Ensure correct path

router.use("/api", apiRoutes);

router.use((req, res) => {
    // If no API routes are hit, send the user to the home page 
    return res.send("Wrong Route!");
});

module.exports = router;