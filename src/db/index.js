import mongoose from "mongoose";




const connectDB = async () => {


    try {
        console.log(process.env.MONGO_DB_URI);
        await mongoose.connect(`${process.env.MONGO_DB_URI}/${process.env.DB_NAME}`);
        console.log("Connection To Database is successful");
    } catch (error) {
        console.log("Error while connecting to db", error);
        process.exit(1);

    }



}


export default connectDB;