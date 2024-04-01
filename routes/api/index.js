const routes = require("express").Router();
const userRountes = require("./user-routes");
const thoughtRouter = require("./thought-router");

// /api/users or /api will be prefixed to every route  
routes.use("/users", userRountes);   //takes the users from userRoutes and adds them to our routes  

// /:id is a dynamic segment that we can use in our endpoint  
// this means whatever number comes after "users" in the url will be used here  
// so if the id was 1, it would look like this http://localhost:3001/api/users/1
routes.use("/thoughts/:userId", thoughtRouter);      

// exporting our router    
module.exports = routes;  