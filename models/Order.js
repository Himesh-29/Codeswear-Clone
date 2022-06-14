const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    orderid: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    products: { type: Object, required: true },
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    phone: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
