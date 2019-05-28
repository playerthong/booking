const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const ModalSchema = new Schema(
  {
    code: {type: String, required: true},
    totalSlots: {type: Number},
    takenSlots: {type: Number},
    createAt: {type:Number},
    updateAt: {type:Number}
  });

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("tables", ModalSchema);