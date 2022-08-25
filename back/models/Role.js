const { Schema, model } = require('mongoose');

const schema = new Schema({
  userRole: { type: String, unique: true, default: 'user' },
});

module.exports = model('Role', schema);
