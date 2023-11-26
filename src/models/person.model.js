import mongoose from "mongoose";


const personSchema = new mongoose.Schema({
  


    firstName: {
        type: String,
        required: true,
        trim: true
    },

    gender: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },

    middleName: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    }
}, { timestamps: true })


export const Person = mongoose.model('person', personSchema);