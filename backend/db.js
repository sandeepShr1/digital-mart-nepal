const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/digitalmartnepal?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false";

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("connected to mongo successfully");
    })

}

module.exports = connectToMongo;