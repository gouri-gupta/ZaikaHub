import mongoose from "mongoose";

//Create a sub-schema for menu_items
/*Because:
It keeps the code clean
You get validation for each field
It prevents mistakes in array objects
You can reuse the schema later (for HomeChef also!) */
//A sub-schema describes what each menu item object looks like.

const menuItemSchema = new mongoose.Schema({
    item_id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    category: String,
    available: Boolean
});


const restaurantSchema=mongoose.Schema({
    name:String,
    location:{
        address:String,
        city:String,
        pincode:Number
    },
    cuisine_type:[String],
    food_type:String,
    menu_items:[menuItemSchema],
    ratings:Number
})

const restaurantModel=mongoose.model("Restaurants", restaurantSchema,"Restaurants")
export default restaurantModel

//Restaurants Object
/*
{
  "_id": {
    "$oid": "689f119dda1bfb28f3eec4c5"
  },
  "name": "Raghuveer Refreshment",
  "location": {
    "address": "Rajapeth road",
    "city": "Nagpur",
    "pincode": 444560
  },
  "cuisine_type": [
    "North Indian",
    "Maharashtrian",
    "Gujrati"
  ],
  "food_type": "veg",
  "menu_items": [
    {
      "item_id": {
        "$oid": "689f119dda1bfb28f3eec4bd"
      },
      "name": "Kachori",
      "price": 35,
      "category": "Snacks",
      "available": true
    },
    {
      "item_id": {
        "$oid": "689f119dda1bfb28f3eec4be"
      },
      "name": "Samosa",
      "price": 40,
      "category": "Snacks",
      "available": true
    },
    {
      "item_id": {
        "$oid": "689f119dda1bfb28f3eec4bf"
      },
      "name": "Sambharwadi",
      "price": 45,
      "category": "Snacks",
      "available": true
    },
    {
      "item_id": {
        "$oid": "689f119dda1bfb28f3eec4c0"
      },
      "name": "Bombay Bhel",
      "price": 50,
      "category": "Snacks",
      "available": true
    },
    {
      "item_id": {
        "$oid": "689f119dda1bfb28f3eec4c1"
      },
      "name": "Dhokla",
      "price": 30,
      "category": "Breakfast",
      "available": true
    },
    {
      "item_id": {
        "$oid": "689f119dda1bfb28f3eec4c2"
      },
      "name": "Misal Pav",
      "price": 35,
      "category": "Main Course",
      "available": false
    },
    {
      "item_id": {
        "$oid": "689f119dda1bfb28f3eec4c3"
      },
      "name": "Palak wada",
      "price": 35,
      "category": "Sides",
      "available": true
    },
    {
      "item_id": {
        "$oid": "689f119dda1bfb28f3eec4c4"
      },
      "name": "Kothimbir wadi",
      "price": 25,
      "category": "Snacks",
      "available": true
    }
  ],
  "ratings": 4.9
}
*/