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
  preferences: {
    notifications: {
      trafficUpdates: { type: String, enum: ["off", "immediate", "hourly", "daily"], default: "off" },
      cityUpdates: { type: String, enum: ["off", "immediate", "daily"], default: "off" },
      emergencyAlerts: { type: String, enum: ["off", "immediate"], default: "immediate" },
      weatherUpdates: { type: String, enum: ["off", "immediate", "hourly"], default: "off" }

    }
  }
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;