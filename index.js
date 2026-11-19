const express = require("express");
const mongoose = require("mongoose");

require('dotenv').config();
const app = express();

app.use(express.json());

const userRoutes = require("./routes/user.js");
const workoutRoutes = require("./routes/workout.js");

app.use("/api/user", userRoutes);
app.use("/api/workout", workoutRoutes);

mongoose.connect(process.env.MONGODB_STRING);
mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'));

if(require.main === module){
    app.listen(process.env.PORT || 3000, () => {
        console.log(`API is now online on port ${ process.env.PORT || 3000 }`)
    });
}