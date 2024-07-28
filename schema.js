var mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema=new Schema({
    name: {
        type: String,
        required: true,
        min: 15,
        max: 50
      },
    message: {
        type: String,
        required: true,
        min: 15,
        max: 50
      },
})
const Messaging = mongoose.model("messagesz", messageSchema);

module.exports={Messaging:Messaging}