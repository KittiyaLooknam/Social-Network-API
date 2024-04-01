const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/api');

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp';

// Create Express app
const app = express();

app.use(express.json()); // Middleware for parsing JSON and bind it to req.body

// Routes 
app.use('/api', routes);

// Connect to the Mongo DB database using Mongoose
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false, // Corrected typo
    useCreateIndex: true // Corrected typo
})
.then(() => console.log("MongoDB connected successfully"))
// start server
.catch(err => console.error('Error connecting to MongoDB:', err))
.then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});