import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    // sender : {
    //     type : String,
    //     required : true
    // },

    sender_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true,
    },

    // receiver : {
    //     type : String,
    //     required : true
    // },

    receiver_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true,
    },

    message : {
        type : String,
        required : true,
    },

    room : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    }
    
}, {timestamps: true});

export default mongoose.model("chatsDB" , chatSchema);