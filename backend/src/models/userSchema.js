import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true,
        unique : true
    },

    password : {
        type : String,
        required : true
        // select : false
    },

    verified : {
        type : Boolean,
        default : false 
    },

    isLoggedIn : {
        type : Boolean,
        default : false
    },

    token : {
        type : String,
    }
});

export default mongoose.model("userDB" , userSchema)