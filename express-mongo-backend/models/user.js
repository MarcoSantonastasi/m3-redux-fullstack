const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create an object to create, read, update and delete asset data in the MongoDB

let userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    userName: String,
    password: String
  },
  {
    timestamps: {
      createdAt: "cteated_at",
      updatedAt: "updated_at"
    }
  }
);

const User = (module.exports = mongoose.model("User", userSchema));
