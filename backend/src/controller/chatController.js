import chatSchema from "../models/chatSchema.js";
// import socket from "socket.io";

// Getting messages between two users
export const getMessages = async (req, res) => {
    try {
        // const { sender_id, receiver_id } = req.params;
        // const messages = await chatSchema.find({
        //     $or: [
        //         { sender, receiver },
        //         { sender_id: sender_id, receiver: receiver_id }
        //     ]
        // }).sort({ timestamp: 1 });

        // res.json(messages);
    } catch (error) {
        res.status(500).json({
            message: 'Error Occured: ' + error.message
        });
    }
};

// Post a new message (REST API)
export const sendMessage = async (req, res) => {
    try {
        const { sender_id, receiver_id, message } = req.body;
        const data = await chatSchema.create({ sender_id : sender_id, receiver_id : receiver_id, message : message});
        await data.save();

        res.status(201).json(data);

        if(data)
        {
            res.json({
                status : 201,
                data : data,
                message : "Chat Saved"
            })
        }
        else
        {
            res.json({
                status : 400,
                message : "Chat Not Saved"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error Occured: ' + error.message
        });
    }
};
