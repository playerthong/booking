const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const ModalSchema = new Schema(
  {
    tableCode: {type: String},
    totalSlots: {type: Number},
    customerName: {type: String},
    customerPhone: {type: String},
    createAt: {type:Number},
    updateAt: {type:Number}
  });

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("bookings", ModalSchema);