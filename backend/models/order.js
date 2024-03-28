const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  order_date: {
    type: Date,
    default: Date.now,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered'],
    default: 'pending'
  },
  total_price: {
    type: Number,
    required: true
  },
  shipping_address: {
    type: String
  },
  payment_method: {
    type: String
  }
});

orderSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.order_id = document._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Order', orderSchema);
