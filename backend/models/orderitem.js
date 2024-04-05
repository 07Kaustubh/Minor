const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  product_id: {
    type: Number,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  subtotal: {
    type: Number
  },
  tax: {
    type: Number
  }
});

orderItemSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.order_item_id = document._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('OrderItem', orderItemSchema);
