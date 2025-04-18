const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  //preferences could be multiple things, so this was created
  //to prepare for any expansions we may have. Right now the only
  //preferences are notifications.
  preferences: {
    notifications: {
      //these are default assumptions right now, assuming the frontend will have a dropdown
      //menu for these options - very easy to change if we want a different format.
      trafficUpdates: { type: String, enum: ["off", "immediate", "hourly", "daily"], default: "off" },
      cityUpdates: { type: String, enum: ["off", "immediate", "daily"], default: "off" },
      emergencyAlerts: { type: String, enum: ["off", "immediate"], default: "immediate" },
      weatherUpdates: { type: String, enum: ["off", "immediate", "hourly"], default: "off" }

    }
  },
  //store the user selected city from the homepage
  selectedCity: { type: String, required : false}
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;