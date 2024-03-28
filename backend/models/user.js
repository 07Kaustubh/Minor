const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const addressSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  }
});

const userSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  address: [addressSchema],
  email: {
    type: String,
    required: true,
    unique: true // Ensure email uniqueness
  },
  passwordHash: {
    type: String,
    required: true
  },
  tokens: [{
    type: String
  }],
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }]
});

// Hash password before saving user
userSchema.pre('save', async function (next) {
  const user = this;
  console.log('userSchema.pre-save:', user); // Logging user object before saving
  if (user.isModified('password')) {
    user.passwordHash = await bcrypt.hash(user.password, 10); // Hash the 'password' field
  }
  next();
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.user_id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash; // Do not return password hash
    delete returnedObject.tokens; // Do not return tokens
  }
});

module.exports = mongoose.model('User', userSchema);
