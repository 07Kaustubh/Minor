const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  transaction_date: {
    type: Date,
    default: Date.now,
    required: true
  },
  payment_method: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  transaction_type: {
    type: String
  },
  response_code: {
    type: String
  }
});

transactionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.transaction_id = document._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);
