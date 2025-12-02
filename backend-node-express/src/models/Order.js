import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
    item_id: mongoose.Schema.Types.ObjectId,
    name: String,
    quantity: Number,
    price: Number
})

const orderSchema = mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    restaurant_id: { type: mongoose.Schema.Types.ObjectId, default: null },
    home_chef_id: { type: mongoose.Schema.Types.ObjectId, default: null },
    items: [itemSchema],
    total_amount: Number,
    order_date: { type: Date, default: Date.now },
    status: {
        type: String,
        enum: ["placed", "preparing", "out for delivery", "delivered", "cancelled"],
        default: "placed"
    },
    delivery_id: { type: mongoose.Schema.Types.ObjectId, default: null }
})

//restaurant_id and home_chef_id
/*Mongoose does NOT accept null unless you explicitly allow it.
So you must mark these as nullable (optional). -> done using default */

/*status field — recommended to use enum

Your allowed values (from frontend mock):
placed
preparing
out for delivery
delivered
cancelled

Recommended:

status: { 
  type: String, 
  enum: ["placed", "preparing", "out for delivery", "delivered", "cancelled"], 
  default: "placed" 
}

Optional but safer. */

//Similarly delivery_id should also be allowed for NULL initially

const orderModel = mongoose.model("Orders", orderSchema,"Orders")
export default orderModel

/*
{
  "_id": {
    "$oid": "689f600c64ae0cddb3eec4f5"
  },
  "user_id": {
    "$oid": "689f0715da1bfb28f3eec4ad"
  },
  "restaurant_id": {
    "$oid": "689f168cda1bfb28f3eec4d5"
  },
  "home_chef_id": null,
  "items": [
    {
      "item_id": {
        "$oid": "689f168cda1bfb28f3eec4c7"
      },
      "name": "Veg Hakka Noodles ",
      "quantity": 1,
      "price": 180
    }
  ],
  "total_amount": 180,
  "order_date": {
    "$date": "2024-02-10T09:20:00.000Z"
  },
  "status": "preparing",
  "delivery_id": {
    "$oid": "689f600c64ae0cddb3eec4f4"
  }
}
*/


//This is an example of Orders collection
//user_id come from Users collection  -> which user has given the order
//restaurant_id and home_chef_id indicates the restaurant OR home_chef from which the order is ordered
//Depending on whether the user has ordered from restaurant or homechef One of these keys will be NULL

