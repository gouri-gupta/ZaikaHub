import mongoose from 'mongoose'

const menuItemSchema = new mongoose.Schema({
    item_id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    category: String,
    available: Boolean
});


const homechefSchema=mongoose.Schema({
    location:{
        address:String,
        city:String,
        pincode:Number
    },
    cuisine_type:[String],
    food_type:String,
    speciality:String,
    menu_items:[menuItemSchema],
    operating_days:[String],
    rating:Number,
    name:String
})

const homechefModel=mongoose.model("Homechef", homechefSchema, "Home_chef")
export default homechefModel


//Homechef object 
/*
{
  "_id": {
    "$oid": "689f576664ae0cddb3eec4bd"
  },
  "location": {
    "address": "Lokhandwala Complex",
    "city": "Mumbai",
    "pincode": 400053
  },
  "cuisine_type": [
    "North Indian",
    "Punjabi"
  ],
  "food_type": "veg",
  "speciality": "Homemade Paneer Dishes",
  "menu_items": [
    {
      "item_id": {
        "$oid": "689f576664ae0cddb3eec4a9"
      },
      "name": "Paneer Butter Masala",
      "price": 220,
      "category": "Main Course",
      "available": true
    },
    {
      "item_id": {
        "$oid": "689f576664ae0cddb3eec4aa"
      },
      "name": "Dal Makhani",
      "price": 180,
      "category": "Main Course",
      "available": true
    },
    {
      "item_id": {
        "$oid": "689f576664ae0cddb3eec4ab"
      },
      "name": "Jeera Rice",
      "price": 90,
      "category": "Sides",
      "available": true
    },
    {
      "item_id": {
        "$oid": "689f576664ae0cddb3eec4ac"
      },
      "name": "Gajar Halwa",
      "price": 120,
      "category": "Desserts",
      "available": true
    }
  ],
  "operating_days": [
    "Monday",
    "Wednesday",
    "Friday",
    "Sunday"
  ],
  "rating": 4.5,
  "name": "Priya Sharma"
}
*/