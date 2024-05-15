import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  products: [
    {
        type: mongoose.ObjectId,
        ref: "Products"
    }
  ],
  paymet: {

  },
  buyer: {
    type: mongoose.ObjectId,
    ref: "users"
  },
  status: {
    type: String,
    default: "Not Processed",
    enum:["Not Processed", "Processing", "Shippped", "deliverd", "cancel"],
  }
}, {timestamps:  true});

export default mongoose.model("Order", orderSchema);
