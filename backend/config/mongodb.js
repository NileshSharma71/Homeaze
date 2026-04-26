import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected', () => console.log("database connected"))
    await mongoose.connect(`${process.env.MONGODB_URI}/homeaze`)  //create db with the name homeaze whenever the connection is established

}

export default connectDB;