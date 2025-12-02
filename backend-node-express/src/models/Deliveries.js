import mongoose from "mongoose";

const deliverySchema=mongoose.Schema({
    name:String,
    phone:Number,
    order_id:{ type: mongoose.Schema.Types.ObjectId, default: null },
    status:{
        type: String,
        enum: ["assigned","out for delivery","delivered","available"],
        default: "available"
    },
    tip: { type: Number, default: 0 },
    rating: { type: Number, default: 0 }
})

/*
order_id

You correctly made it nullable:
order_id: { type: mongoose.Schema.Types.ObjectId, default: null }

This is perfect because:
some delivery boys are free/available → order_id = null
cancelled orders → no delivery document
*/

/*
Status field — correct enum values

This exactly matches your use-case:
available → free delivery boy
assigned → assigned to order
out for delivery → on the way
delivered → done
*/

/*
tip and rating

You currently have:

tip: Number,
rating: Number

This is valid, but for clarity & avoiding mongoose warnings, it is better to write:
tip: { type: Number, default: 0 },
rating: { type: Number, default: 0 }

Why?
If a new delivery boy is added without tip/rating, your backend may receive undefined
Default avoids regression issues
Your UI always shows a number
*/

const deliveryModel=mongoose.model("Deliveries", deliverySchema,"Deliveries")
export default deliveryModel

/*
{
  "_id": {
    "$oid": "689f600c64ae0cddb3eec4f4"
  },
  "name": "Sameer Chaudhary",
  "phone": 789326541,
  "order_id": {
    "$oid": "689f600c64ae0cddb3eec4f5"
  },
  "status": "assigned",
  "tip": 10,
  "rating": 2.9
}
*/