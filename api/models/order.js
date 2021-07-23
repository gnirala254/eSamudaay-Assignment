const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  torder_itemsrk: [
    {
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
  distance: Number,
  offer: {
    offer_type: String,
    offer_val: Number,
  },
});

module.exports = mongoose.model('Order', orderSchema);
