const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    Name: {
      type: String,
      required: true,
    }
} , { timestamps: true });

mongoose.models = {}
const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;
